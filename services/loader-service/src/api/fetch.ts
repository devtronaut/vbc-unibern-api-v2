import config from '../common/config/config'
import { Game } from '../common/types/game.type'
import { Ranking } from '../common/types/ranking.type'

export async function fetchData(apiKey: string | undefined): Promise<[Game[], Ranking[]]> {
    if (!apiKey) throw new Error('No API key for the SwissVolley API. Aborting.');

    const gamesData = await fetchGames(false, apiKey);
    const rankingsData = await fetchRankings(apiKey);

    return [gamesData, rankingsData]
}

export async function fetchGames(excludeCup: boolean, apiKey: string): Promise<Game[]> {
    console.log('Starting to fetch games');
    const url = excludeCup ? config.SWISSVOLLEY_API_GAMES_URL : config.SWISSVOLLEY_API_GAMES_WITH_CUP_URL;

    const games = await fetchFromSwissvolleyAPI<Game[]>(url, apiKey);
    console.log(`Fetched ${games.length} games from the SwissVolley API`);

    return games;
}

export async function fetchRankings(apiKey: string): Promise<Ranking[]> {
    console.log('Starting to fetch rankings');
    const rankings = await fetchFromSwissvolleyAPI<Ranking[]>(
        config.SWISSVOLLEY_API_RANKINGS_URL, apiKey
    )
    console.log(
        `Fetched ${rankings.length} rankings from the SwissVolley API.`
    )
    return rankings
}

export async function fetchFromSwissvolleyAPI<T>(
    url: string,
    apiKey: string
): Promise<T> {
    console.log('Fetch from url: ' + url)

    const authHeader = {
        Authorization: apiKey,
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: authHeader,
    })

    if (res.ok) {
        const body = await res.json()
        return body as unknown as T
    } else {
        console.error(
            `Request failed with status code ${res.status ?? 'unknown'} and message ${res.statusText ?? 'unknown'}`
        )
        throw new Error(
            `Request failed with status code ${res.status ?? 'unknown'} and message ${res.statusText ?? 'unknown'}`
        )
    }
}
