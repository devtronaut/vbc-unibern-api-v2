import config from '../common/config/config';
import { Game } from '../common/types/game.type';
import { Ranking } from '../common/types/ranking.type';

export async function fetchGames(cup: boolean): Promise<Game[]>{
    return await fetchFromSwissvolleyAPI<Game[]>(config.SWISSVOLLEY_API_GAMES_ENDPOINT + (cup ? '?includeCup=1' : ''));
}

export async function fetchRankings(): Promise<Ranking[]>{
  return await fetchFromSwissvolleyAPI<Ranking[]>(config.SWISSVOLLEY_API_RANKINGS_ENDPOINT);
}

export async function fetchFromSwissvolleyAPI<T>(url: string): Promise<T>{

  console.log('Fetch for url: ' + url);

  const authHeader = {
    "Authorization": process.env.SWISSVOLLEY_API_KEY!
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
    throw new Error(`Request failed with status code ${res.status ?? 'unknown'} and message ${res.statusText ?? 'unknown'}`);
  }
}