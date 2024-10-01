import config from '../common/config/config'
import { TeamSchema } from '../extract/extractTeamsData'
import { batchWrite } from './utils/dbUtils'
import { RankingSchema } from '../extract/extractRankingsData'
import { ResultPerTeamSchema } from '../extract/extractResultsData'
import { UpcomingGamesPerTeamSchema } from '../extract/extractUpcomingGamesData'

export async function persistTeams(teams: TeamSchema[]): Promise<boolean> {
    try {
        await batchWrite<TeamSchema>(teams, config.TEAMS_TABLE)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function persistRankings(
    rankings: RankingSchema[]
): Promise<boolean> {
    try {
        await batchWrite<RankingSchema>(rankings, config.RANKINGS_TABLE)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function persistResults(
    results: ResultPerTeamSchema[]
): Promise<boolean> {
    try {
        await batchWrite<ResultPerTeamSchema>(results, config.RESULTS_TABLE)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function persistUpcomingGames(
    upcomingGames: UpcomingGamesPerTeamSchema[]
): Promise<boolean> {
    try {
        await batchWrite<UpcomingGamesPerTeamSchema>(
            upcomingGames,
            config.UPCOMING_GAMES_TABLE
        )
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
