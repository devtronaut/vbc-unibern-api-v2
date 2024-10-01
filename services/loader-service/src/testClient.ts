import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'

import { fetchGames, fetchRankings } from './extract/fetch'
import { extractTeamsData } from './extract/extractTeamsData'
import { extractRankingsData } from './extract/extractRankingsData'
import { extractUpcomingGamesData } from './extract/extractUpcomingGamesData'
import { extractResultsData } from './extract/extractResultsData'
import { Game } from './common/types/game.type'
import { Ranking } from './common/types/ranking.type'

import config from './common/config/config'
import { Stage } from './common/enums/stage.enum'

test().then(() => console.log('\nDone!'))

async function test(): Promise<void> {
    try {
        const gamesNoCup =
            config.STAGE === Stage.DEV
                ? (readJSON('./mockData/gamesNoCup-mock.json') as Game[])
                : await fetchGames(false)
        if (!gamesNoCup)
            return console.error(
                'Error when fetching games for teams data (w/o cup).'
            )
        const teamsData = extractTeamsData(gamesNoCup)
        console.log(teamsData.length)
        teamsData.forEach(t => console.log(JSON.stringify(t, null, 2)))
        // console.log(JSON.stringify(teamsData[0], null, 2));

        // Don't use the fetchGamesSeparated function here, since it doesn't support the mock data json.
        // const games =
        //     config.STAGE === Stage.DEV
        //         ? (readJSON('./mockData/games-mock.json') as Game[])
        //         : await fetchGames(true)
        // if (!games)
        //     return console.error(
        //         'Error when fetching games for upcoming games and results (w/ cup).'
        //     )

        // const upcomingGamesRaw: Game[] = []
        // const resultsRaw: Game[] = []

        // games.forEach(game => {
        //     if (game.setResults.length === 0) {
        //         upcomingGamesRaw.push(game)
        //     } else {
        //         resultsRaw.push(game)
        //     }
        // })

        // const upcomingGamesData = extractUpcomingGamesData(
        //     upcomingGamesRaw,
        //     teamsData
        // )
        // const resultsData = extractResultsData(resultsRaw, teamsData)
        // resultsData.forEach(r => console.log(JSON.stringify(r, null, 2)));
        // console.log(JSON.stringify(resultsData[0], null, 2));

        // console.log(JSON.stringify(upcomingGamesData[0], null, 2));
        // upcomingGamesData[3].upcomingGames.forEach(game => console.log(game.league))

        // const rankings = config.STAGE === Stage.DEV ? readJSON('./mockData/rankings-mock.json') as Ranking[] : await fetchRankings();
        // if (!rankings) return console.error('Error when fetching rankings.');
        // const teamRankingsData = extractRankingsData(rankings, teamsData);

        // teamRankingsData.forEach(r => console.log(JSON.stringify(r, null, 2)));
        // console.log(JSON.stringify(teamRankingsData[0], null, 2));
    } catch (e) {
        console.error(e)
    }
}

function readJSON(uri: string) {
    const jsonString = fs.readFileSync(path.join(__dirname, uri), 'utf-8')
    return JSON.parse(jsonString)
}
