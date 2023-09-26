import config from '../common/config/config';
import { Game } from '../common/types/game.type';
import { Ranking } from '../common/types/ranking.type';

export async function fetchGames(cup: boolean): Promise<Game[] | null>{
  try{
    console.log('Starting to fetch games.');
    const endpoint = config.SWISSVOLLEY_API_GAMES_ENDPOINT + (cup ? '?includeCup=1' : '');
    const vbcApiKey = process.env.SWISSVOLLEY_API_KEY_VBCUNIBERN!;
    const volleyApiKey = process.env.SWISSVOLLEY_API_KEY_VOLLEYUNIBERN!;

    const vbcGames = await fetchFromSwissvolleyAPI<Game[]>(endpoint, vbcApiKey);
    const volleyGames = await fetchFromSwissvolleyAPI<Game[]>(endpoint, volleyApiKey);

    const games = [...vbcGames, ...volleyGames];

    console.log(`Fetched ${games.length} games from the SwissVolley API.`);  
    return games;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchRankings(): Promise<Ranking[] | null>{
  try{
    const rankings = await fetchFromSwissvolleyAPI<Ranking[]>(config.SWISSVOLLEY_API_RANKINGS_ENDPOINT, process.env.SWISSVOLLEY_API_KEY_VBCUNIBERN!);
    console.log(`Fetched ${rankings.length} rankings from the SwissVolley API.`);
    return rankings;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchGamesSeparated(cup: boolean): Promise<[Game[], Game[]] | [null, null]>{
  try{
    const allGames = await fetchGames(cup);

    if(!allGames){
      return [null, null];
    }

    const upcomingGamesRaw: Game[] = [];
    const resultsRaw: Game[] = [];

    allGames.forEach(game => {
      if (game.setResults.length === 0) {
        upcomingGamesRaw.push(game);
      } else {
        resultsRaw.push(game);
      }
    });

    return [upcomingGamesRaw, resultsRaw];

  } catch(err) {
    console.error(err);
    return [null, null];
  }
}

export async function fetchFromSwissvolleyAPI<T>(url: string, apiKey: string): Promise<T>{

  console.log('Fetch for url: ' + url);

  const authHeader = {
    "Authorization": apiKey
  }

  const res = await fetch(
    url,
    {
      method: 'GET',
      headers: authHeader
    }
  );

  if(res.ok){
    const body = await res.json();
    return body as unknown as T;
  } else {
    console.error(`Request failed with status code ${res.status ?? 'unknown'} and message ${res.statusText ?? 'unknown'}`);
    throw new Error(`Request failed with status code ${res.status ?? 'unknown'} and message ${res.statusText ?? 'unknown'}`);
  }
}