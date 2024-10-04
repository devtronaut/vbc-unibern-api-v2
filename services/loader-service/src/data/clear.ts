import config from '../common/config/config'
import { clearTable } from './utils/dbUtils'

export async function clearTeamsTable(): Promise<void> {
    await clearTable(config.TEAMS_TABLE_NAME)
}

export async function clearRankingsTable(): Promise<void> {
    await clearTable(config.RANKINGS_TABLE_NAME)
}

export async function clearResultsTable(): Promise<void> {
    await clearTable(config.RESULTS_TABLE_NAME)
}

export async function clearUpcomingGamesTable(): Promise<void> {
    await clearTable(config.UPCOMING_GAMES_TABLE_NAME)
}
