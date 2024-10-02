import {
    clearRankingsTable,
    clearResultsTable,
    clearTeamsTable,
    clearUpcomingGamesTable,
} from '../data/clear'
import {
    persistRankings,
    persistResults,
    persistTeams,
    persistUpcomingGames,
} from '../data/persist'
import { extractRankingsData } from '../extract/extractRankingsData'
import { extractResultsData } from '../extract/extractResultsData'
import { extractTeamsData } from '../extract/extractTeamsData'
import { extractUpcomingGamesData } from '../extract/extractUpcomingGamesData'
import {
    fetchGames,
    fetchGamesSeparated,
    fetchRankings,
} from '../extract/fetch'

export async function main() {
    // Fetch games (w/o cup), extract and persist teams data
    console.log('Starting to persist teams.')
    console.log('Fetching games for teams data (w/o cup).')
    const gamesNoCup = await fetchGames(false)
    if (!gamesNoCup)
        return console.error(
            'Error when fetching games for teams data (w/o cup).'
        )
    const teamsData = extractTeamsData(gamesNoCup)
    console.log(`Extracted ${teamsData.length} teams from the games response.`)
    if (teamsData.length > 0) await clearTeamsTable()
    console.log(teamsData)
    const persistTeamsResult = await persistTeams(teamsData)
    if (!persistTeamsResult) throw new Error('Unable to persist teams.')
    console.log(`Successfully persisted ${teamsData.length} teams.`)
    console.log(`=================================================`)

    // Fetch games (w/ cup), separated in upcoming games and played games
    console.log('Fetching games for upcoming games and results (w/ cup).')
    const [upcomingGamesRaw, resultsRaw] = await fetchGamesSeparated(true)
    if (!upcomingGamesRaw || !resultsRaw)
        return console.error(
            'Error when fetching games for upcoming games and results (w/ cup).'
        )
    console.log(
        `Successfully fetched ${upcomingGamesRaw.length} upcoming games and ${resultsRaw.length} game results.`
    )
    console.log(`=================================================`)

    // Extract and persist upcoming games data
    console.log('Starting to persist upcoming games.')
    const upcomingGamesData = extractUpcomingGamesData(
        upcomingGamesRaw,
        teamsData
    )
    console.log(
        `Extracted ${upcomingGamesData.length} relevant upcoming games.`
    )
    if (upcomingGamesData.length > 0) await clearUpcomingGamesTable()
    const persistUpcomingGamesResult =
        await persistUpcomingGames(upcomingGamesData)
    if (!persistUpcomingGamesResult)
        throw new Error('Unable to persist upcoming games.')
    console.log(
        `Successfully persisted ${upcomingGamesData.length} upcoming games.`
    )
    console.log(`=================================================`)

    // Extract and persist upcoming game results data
    console.log('Starting to persist game results.')
    const resultsData = extractResultsData(resultsRaw, teamsData)
    console.log(`Extracted ${resultsData.length} relevant game results.`)
    if (resultsData.length > 0) await clearResultsTable()
    const persistResultsResult = await persistResults(resultsData)
    if (!persistResultsResult)
        throw new Error('Unable to persist game results.')
    console.log(`Successfully persisted ${resultsData.length} upcoming games.`)
    console.log(`=================================================`)

    // Fetch rankings, extract and persist data
    console.log('Starting to persist rankings.')
    console.log('Fetching rankings.')
    const rankings = await fetchRankings()
    if (!rankings) return console.error('Error when fetching rankings.')
    const rankingsData = extractRankingsData(rankings, teamsData)
    console.log(`Extracted ${rankingsData.length} relevant rankings.`)
    if (rankingsData.length > 0) await clearRankingsTable()
    const persistRankingsResult = await persistRankings(rankingsData)
    if (!persistRankingsResult) throw new Error('Unable to persist rankings.')
    console.log(`Successfully persisted ${rankingsData.length} rankings.`)
    console.log(`=================================================`)
}
