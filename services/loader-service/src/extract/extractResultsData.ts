import { Game } from '../common/types/game.type.js'
import { TeamSchema } from './extractTeamsData.js'

type ResultTeamSchema = {
    caption: string
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
    id: string,
    teamId: number,
    league: string,
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
        const data = getResultsData(game, teams)

        resultsData.push(data)
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
    ownTeams: Map<number, TeamSchema>
): ResultsSchema {
    const homeTeam = game.teams.home
    const awayTeam = game.teams.away

    // FIXME With two 2L teams, the results of the second team get ignored, because here we always just match the first team !!!
    // FIXME Maybe match against both ids and check if both match, to find such cases. Then define handling.
    const ownTeamId = ownTeams.has(homeTeam.teamId) ? homeTeam.teamId : awayTeam.teamId;
    const ownTeamInfo = getTeamInfo(game, ownTeams.get(ownTeamId)!);

    const homeTeamSummary: ResultTeamSchema = {
        caption: homeTeam.caption,
        setsWon: game.resultSummary.wonSetsHomeTeam,
        sets: game.setResults.map(result => result.home),
    }

    const awayTeamSummary: ResultTeamSchema = {
        caption: awayTeam.caption,
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
            ownTeam.league.leagueId ===
                game.league.leagueId
                ? 'Meisterschaft'
                : gameLeague,
    }
}
