import { Game } from '../common/types/game.type';
import { TeamSchema } from './extractTeamsData';

export enum GameType {
  HOME = 'Heim',
  AWAY = 'Auswärts'
}

type LocationSchema = {
  caption: string,
  street: string,
  number: string,
  zip: string, 
  city: string,
  plusCode: string
}

type UpcomingGamesSchema = {
  id: string,
  teamId: number,
  gameId: number,
  dateUtc: string,
  league: string,
  opponent: string,
  type: GameType,
  location: LocationSchema,
}

export type UpcomingGamesPerTeamSchema = {
  teamId: number,
  createdAt: string,
  upcomingGames: UpcomingGamesSchema[]
}

export function extractUpcomingGamesData(upcomingGamesRaw: Game[], teamsData: TeamSchema[]): UpcomingGamesPerTeamSchema[] {
  const teams = new Map <number, TeamSchema>()
  teamsData.forEach(team => {
    teams.set(team.teamId, team);
  })

  const upcomingGamesData: UpcomingGamesSchema[] = [];

  upcomingGamesRaw.forEach(game => {
    const data = getUpcomingGamesData(game, teams);

    upcomingGamesData.push(data);
  })

  const upcomingGamesPerTeam: UpcomingGamesPerTeamSchema[] = [];
  teamsData.forEach(team => {
    const resultPerTeam: UpcomingGamesPerTeamSchema = {
      teamId: team.teamId,
      upcomingGames: upcomingGamesData.filter(data => data.teamId === team.teamId),
      createdAt: new Date().toISOString()
    }

    upcomingGamesPerTeam.push(resultPerTeam);
  });

  return upcomingGamesPerTeam;
}

export function getUpcomingGamesData(game: Game, ownTeams: Map<number, TeamSchema>): UpcomingGamesSchema {

  // Information specific to wether this is a homegame or not (from perspective of VBCUB)
  const teamInfo = ownTeams.has(game.teams.home.teamId) ? {
    id: ownTeams.get(game.teams.home.teamId)!.id,
    teamId: game.teams.home.teamId,
    type: GameType.HOME,
    opponent: game.teams.away.caption,
    league: ownTeams.get(game.teams.home.teamId)!.league.caption
  } : {
      id: ownTeams.get(game.teams.away.teamId)!.id,
      teamId: game.teams.away.teamId,
      type: GameType.AWAY,
      opponent: game.teams.home.caption,
      league: ownTeams.get(game.teams.away.teamId)!.league.caption
  };

  const location: LocationSchema = {
    caption: game.hall.caption,
    street: game.hall.street,
    number: game.hall.number,
    zip: game.hall.zip,
    city: game.hall.city,
    plusCode: game.hall.plusCode
  }

  const upcomingGameData: UpcomingGamesSchema = {
    ...teamInfo,
    gameId: game.gameId,
    dateUtc: game.playDateUtc,
    location
  };

  return upcomingGameData;
}