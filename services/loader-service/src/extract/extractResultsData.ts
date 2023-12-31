import { Game } from '../common/types/game.type.js';
import { TeamSchema } from './extractTeamsData.js';

type ResultTeamSchema = {
  caption: string,
  setsWon: number,
  sets: number[]
}

type ResultsSchema = {
  id: string,
  teamId: number,
  gameId: number,
  dateUtc: string,
  winner: ResultTeamSchema,
  loser: ResultTeamSchema,
  league: string,
  mode: string
}

export type ResultPerTeamSchema = {
  teamId: number,
  createdAt: string,
  results: ResultsSchema[]
}

export function extractResultsData(resultsRaw: Game[], teamsData: TeamSchema[]): ResultPerTeamSchema[] {
  const teams = new Map<number, TeamSchema>()
  teamsData.forEach(team => {
    teams.set(team.teamId, team);
  })

  const resultsData: ResultsSchema[] = [];

  resultsRaw.forEach(game => {
    const data = getResultsData(game, teams);

    resultsData.push(data);
  })

  const resultsPerTeam: ResultPerTeamSchema[] = [];
  teamsData.forEach(team => {
    const resultPerTeam: ResultPerTeamSchema = {
      teamId: team.teamId,
      results: resultsData.filter(data => data.teamId === team.teamId).sort((ra, rb) => { return Date.parse(rb.dateUtc) - Date.parse(ra.dateUtc) }),
      createdAt: new Date().toISOString()
    }

    resultsPerTeam.push(resultPerTeam);
  });

  return resultsPerTeam;
}

function getResultsData(game: Game, ownTeams: Map<number, TeamSchema>): ResultsSchema {
  const homeTeamId = game.teams.home.teamId;
  const awayTeamId = game.teams.away.teamId;

  const rawCaption = game.league.translations.d;
  const gameLeague = rawCaption.includes('|') ? rawCaption.split('|')[1].trim().split(' ')[0] : rawCaption;

  const teamInfo = ownTeams.has(homeTeamId) ? {
    id: ownTeams.get(homeTeamId)!.id,
    teamId: homeTeamId,
    league: ownTeams.get(homeTeamId)!.league.caption,
    mode: ownTeams.get(homeTeamId)!.league.leagueId === game.league.leagueId ? 'Meisterschaft' : gameLeague
  } : {
      id: ownTeams.get(awayTeamId)!.id,
      teamId: awayTeamId,
      league: ownTeams.get(awayTeamId)!.league.caption,
      mode: ownTeams.get(awayTeamId)?.league.leagueId === game.league.leagueId ? 'Meisterschaft' : gameLeague
  }

  const homeTeamSummary: ResultTeamSchema = {
    caption: game.teams.home.caption,
    setsWon: game.resultSummary.wonSetsHomeTeam,
    sets: game.setResults.map(result => result.home)
  }

  const awayTeamSummary: ResultTeamSchema = {
    caption: game.teams.away.caption,
    setsWon: game.resultSummary.wonSetsAwayTeam,
    sets: game.setResults.map(result => result.away)
  }

  const winner = game.resultSummary.winner === 'team_home' ? homeTeamSummary : awayTeamSummary;
  const loser = game.resultSummary.winner !== 'team_home' ? homeTeamSummary : awayTeamSummary;

  const resultInfo: ResultsSchema = {
    gameId: game.gameId,
    ...teamInfo,
    dateUtc: game.playDateUtc,
    winner,
    loser
  }

  return resultInfo;
}