import { Game } from '../common/types/game.type';
import { Team } from '../common/types/teams.type';

type GroupSchema = {
  groupId: number,
  caption: string,
}

type LeagueSchema = {
  leagueId: number,
  caption: string,
  gender: string
}

type ClubSchema = {
  clubId: number,
  caption: string
}

export type TeamSchema = {
  id: string,
  teamId: number,
  caption: string,
  league: LeagueSchema,
  group: GroupSchema,
  club: ClubSchema,
  createdAt: string
}

export function extractTeamsData(games: Game[]): TeamSchema[]{
  const dedupTeamData = new Map<number, TeamSchema>();

  games.forEach(game => {
    const team = game.teams.away.caption.includes('Uni Bern') ? game.teams.away : game.teams.home; 

    if (!dedupTeamData.get(team.teamId)) {
      const teamData = getTeamData(game, team);
      dedupTeamData.set(team.teamId, teamData);
    }
  })

  return Array.from(dedupTeamData.values());
}

function getTeamData(game: Game, team: Team): TeamSchema{
  const rawCaption = game.league.translations.d;

  const leagueCaption = rawCaption.includes('|') ? rawCaption.split('|')[1].trim().split(' ')[0] : rawCaption;
  const leagueGender = game.gender;

  const teamCaption = team.caption.trim();
  const teamSpecifier = teamCaption.endsWith('a') || teamCaption.endsWith('b') ? teamCaption[teamCaption.length - 1] : '';

  const id = (leagueCaption + leagueGender + teamSpecifier).toLowerCase().replace(' ', '').replace('-', '');

  const rawLeague = game.league.translations.d;

  return {
    id,
    teamId: team.teamId,
    caption: team.caption.trim(),
    league: {
      leagueId: game.league.leagueId,
      caption: rawLeague.includes('|') ? rawLeague.split('|')[1].trim() : rawCaption,
      gender: game.gender
    },
    group: {
      groupId: game.group.groupId,
      caption: game.group.translations.shortD
    },
    club: {
      clubId: parseInt(team.clubId),
      caption: team.clubCaption,
    },
    createdAt: new Date().toISOString(),
  }
}