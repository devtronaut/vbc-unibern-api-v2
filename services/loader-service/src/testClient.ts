/* eslint-disable @typescript-eslint/no-unused-vars */

import 'dotenv/config'

import { RankingSchema } from './common/types/extractRankings.type'
import { ResultPerTeamSchema } from './extract/extractResultsData';
import { TeamSchema } from './extract/extractTeamsData';
import { UpcomingGamesPerTeamSchema } from './extract/extractUpcomingGamesData';
import config from './common/config/config';
import { fetchData } from './api/fetch';
import { processData } from './main';

test().then(() => console.log('\nDone!'))

// This function should always closely mimick the main function but without the persistence steps
async function test(): Promise<void> {
    try {
        const allTeams: TeamSchema[] = [];
        const allUpcomingGames: UpcomingGamesPerTeamSchema[] = [];
        const allResults: ResultPerTeamSchema[] = [];
        const allRankings: RankingSchema[] = [];

        for await (const tenant of config.TENANTS){
            const [gamesData, rankingsData] = await fetchData(tenant.apiKey);

            const [teams, upcomingGames, results, rankings] = processData(gamesData, rankingsData, tenant.name);

            allTeams.push(...teams);
            allUpcomingGames.push(...upcomingGames);
            allResults.push(...results);
            allRankings.push(...rankings);
        }

        console.log(allTeams);
        console.log(allUpcomingGames);
        console.log(allResults);
        console.log(allRankings);
    } catch (e) {
        console.error(e)
    }
}
