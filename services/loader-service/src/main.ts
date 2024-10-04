import { fetchData } from './api/fetch';
import config from './common/config/config';
import { RankingSchema } from './common/types/extractRankings.type';
import { Game } from './common/types/game.type';
import { Ranking } from './common/types/ranking.type';
import { persistData } from './data/persist';
import { extractRankingsData } from './extract/extractRankingsData';
import { ResultPerTeamSchema, extractResultsData } from './extract/extractResultsData';
import { extractTeamLogos } from './extract/extractTeamLogos';
import { TeamSchema, extractTeamsData } from './extract/extractTeamsData';
import { UpcomingGamesPerTeamSchema, extractUpcomingGamesData } from './extract/extractUpcomingGamesData';

export async function main() {
    const allTeams: TeamSchema[] = [];
    const allUpcomingGames: UpcomingGamesPerTeamSchema[] = [];
    const allResults: ResultPerTeamSchema[] = [];
    const allRankings: RankingSchema[] = [];

    for await (const tenant of config.TENANTS) {
        const [gamesData, rankingsData] = await fetchData(tenant.apiKey);

        const [teams, upcomingGames, results, rankings] = processData(gamesData, rankingsData, tenant.name);

        allTeams.push(...teams);
        allUpcomingGames.push(...upcomingGames);
        allResults.push(...results);
        allRankings.push(...rankings);
    }

    await persistData(allTeams, allUpcomingGames, allResults, allRankings);
}

export function processData(gamesData: Game[], rankingsData: Ranking[], clubName: string): [TeamSchema[], UpcomingGamesPerTeamSchema[], ResultPerTeamSchema[], RankingSchema[]] {
    if (!gamesData || gamesData.length === 0) throw new Error('No games to be processed. Aborting.')
    if (!rankingsData || rankingsData.length === 0) throw new Error('No rankings to be processed. Aborting.')

    const [upcomingGamesData, resultsData] = separateGamesData(gamesData);
    
    const teamLogoMap = extractTeamLogos(gamesData);
    const teams = extractTeamsData(gamesData, clubName);
    const upcomingGames = extractUpcomingGamesData(upcomingGamesData, teams);
    const results = extractResultsData(resultsData, teams);
    const rankings = extractRankingsData(rankingsData, teams, teamLogoMap);

    return [teams, upcomingGames, results, rankings];
}

function separateGamesData(games: Game[]): [Game[], Game[]] {
    if (games?.length === 0) throw new Error('No games were passed to process. Games array was undefined or empty.')

    const upcomingGamesData: Game[] = []
    const resultsData: Game[] = []

    games.forEach(game => {
        if (game.setResults.length === 0) {
            upcomingGamesData.push(game)
        } else {
            resultsData.push(game)
        }
    })

    return [upcomingGamesData, resultsData]
}