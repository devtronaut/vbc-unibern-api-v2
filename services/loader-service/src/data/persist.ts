import config from '../common/config/config'
import { TeamSchema } from '../extract/extractTeamsData'
import { batchWrite } from './utils/dbUtils'
import { ResultPerTeamSchema } from '../extract/extractResultsData'
import { UpcomingGamesPerTeamSchema } from '../extract/extractUpcomingGamesData'
import { RankingSchema } from '../common/types/extractRankings.type'
import { clearTeamsTable, clearRankingsTable, clearUpcomingGamesTable, clearResultsTable } from './clear'

export async function persistData(teams: TeamSchema[], upcomingGames: UpcomingGamesPerTeamSchema[], results: ResultPerTeamSchema[], rankings: RankingSchema[]) {
    // No teams or no rankings indicate an error with the API or the data processing
    if (!teams || teams.length === 0) throw new Error('No teams to persist. Aborting.')
    if (!rankings || rankings.length === 0) throw new Error('No rankings to persist. Aborting.')

    // No upcoming games or results might be an error, but has to be expected at the start (no results) or end (no upcoming games) of seasons
    if (!upcomingGames || upcomingGames.length === 0) console.warn('No upcoming games to persist. Could be end of the season.')
    if (!results || results.length === 0) console.warn('No results to persist. Could be start of the season')

    // Empty teams and ranking arrays are checked. Clearing the tables is allowed therefore.
    await clearTeamsTable()
    await persistTeams(teams)

    await clearRankingsTable()
    await persistRankings(rankings)

    // Upcoming games and results should only be overwritten, if there is new data
    if (upcomingGames.length > 0) await clearUpcomingGamesTable()
    await persistUpcomingGames(upcomingGames)

    if (results.length > 0) await clearResultsTable()
    await persistResults(results)
}

export async function persistTeams(teams: TeamSchema[]): Promise<void> {
    await batchWrite<TeamSchema>(teams, config.TEAMS_TABLE_NAME)
}

export async function persistRankings(
    rankings: RankingSchema[]
): Promise<void> {
    await batchWrite<RankingSchema>(rankings, config.RANKINGS_TABLE_NAME)
}

export async function persistResults(
    results: ResultPerTeamSchema[]
): Promise<void> {
    await batchWrite<ResultPerTeamSchema>(
        results,
        config.RESULTS_TABLE_NAME
    )
}

export async function persistUpcomingGames(
    upcomingGames: UpcomingGamesPerTeamSchema[]
): Promise<void> {
    await batchWrite<UpcomingGamesPerTeamSchema>(
        upcomingGames,
        config.UPCOMING_GAMES_TABLE_NAME
    )
}
