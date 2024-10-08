import { Game } from '../common/types/game.type.js'
import { TeamSchema } from './extractTeamsData.js'

type ResultTeamSchema = {
    caption: string
    logoUrl: string
    setsWon: number
    sets: number[]
}

type ResultsSchema = {
    id: string
    teamId: number
    gameId: number
    dateUtc: string
    winner: ResultTeamSchema
    loser: ResultTeamSchema
    league: string
    mode: string
}

type TeamInfo = {
    id: string
    teamId: number
    league: string
    mode: string
}

export type ResultPerTeamSchema = {
    teamId: number
    createdAt: string
    results: ResultsSchema[]
}

export function extractResultsData(
    resultsRaw: Game[],
    teamsData: TeamSchema[]
): ResultPerTeamSchema[] {
    const teams = new Map<number, TeamSchema>()
    teamsData.forEach(team => {
        teams.set(team.teamId, team)
    })

    const resultsData: ResultsSchema[] = []

    resultsRaw.forEach(game => {
        const homeTeam = game.teams.home
        const awayTeam = game.teams.away

        const homeTeamIsClubTeam = teams.has(homeTeam.teamId);
        const awayTeamIsClubTeam = teams.has(awayTeam.teamId);

        if (homeTeamIsClubTeam && awayTeamIsClubTeam) {
            resultsData.push(getResultsData(game, teams.get(homeTeam.teamId)!));
            resultsData.push(getResultsData(game, teams.get(awayTeam.teamId)!));
        } else if (homeTeamIsClubTeam) {
            resultsData.push(getResultsData(game, teams.get(homeTeam.teamId)!));
        } else if (awayTeamIsClubTeam) {
            resultsData.push(getResultsData(game, teams.get(awayTeam.teamId)!));
        }
    })

    const resultsPerTeam: ResultPerTeamSchema[] = []
    teamsData.forEach(team => {
        const resultPerTeam: ResultPerTeamSchema = {
            teamId: team.teamId,
            results: resultsData
                .filter(data => data.teamId === team.teamId)
                .sort((ra, rb) => {
                    return Date.parse(rb.dateUtc) - Date.parse(ra.dateUtc)
                }),
            createdAt: new Date().toISOString(),
        }

        resultsPerTeam.push(resultPerTeam)
    })

    return resultsPerTeam
}

function getResultsData(
    game: Game,
    clubTeam: TeamSchema
): ResultsSchema {
    const homeTeam = game.teams.home
    const awayTeam = game.teams.away

    const ownTeamInfo = getTeamInfo(game, clubTeam)

    const homeTeamSummary: ResultTeamSchema = {
        caption: homeTeam.caption,
        logoUrl: homeTeam.logo,
        setsWon: game.resultSummary.wonSetsHomeTeam,
        sets: game.setResults.map(result => result.home),
    }

    const awayTeamSummary: ResultTeamSchema = {
        caption: awayTeam.caption,
        logoUrl: awayTeam.logo,
        setsWon: game.resultSummary.wonSetsAwayTeam,
        sets: game.setResults.map(result => result.away),
    }

    const winner =
        game.resultSummary.winner === 'team_home'
            ? homeTeamSummary
            : awayTeamSummary

    const loser =
        game.resultSummary.winner !== 'team_home'
            ? homeTeamSummary
            : awayTeamSummary

    const resultInfo: ResultsSchema = {
        gameId: game.gameId,
        ...ownTeamInfo,
        dateUtc: game.playDateUtc,
        winner,
        loser,
    }

    return resultInfo
}

function getTeamInfo(game: Game, ownTeam: TeamSchema): TeamInfo {
    const rawCaption = game.league.translations.d
    const gameLeague = rawCaption.includes('|')
        ? rawCaption.split('|')[1].trim().split(' ')[0]
        : rawCaption

    return {
        id: ownTeam.id,
        teamId: ownTeam.teamId,
        league: ownTeam.league.caption,
        mode:
            ownTeam.league.leagueId === game.league.leagueId
                ? 'Meisterschaft'
                : gameLeague,
    }
}
