import config from '../common/config/config'
import { clearTable } from './utils/dbUtils'

export async function clearTeamsTable() {
    try {
        await clearTable(config.TEAMS_TABLE_NAME)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function clearRankingsTable() {
    try {
        await clearTable(config.RANKINGS_TABLE_NAME)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function clearResultsTable() {
    try {
        await clearTable(config.RESULTS_TABLE_NAME)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export async function clearUpcomingGamesTable() {
    try {
        await clearTable(config.UPCOMING_GAMES_TABLE_NAME)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
