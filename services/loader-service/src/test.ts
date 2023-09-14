import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

import { fetchGames, fetchRankings } from './extract/fetch';
import { extractTeamsData } from './extract/extractTeamsData';
import { extractRankingsData } from './extract/extractRankingsData';
import { extractUpcomingGamesData } from './extract/extractUpcomingGamesData';
import { extractResultsData } from './extract/extractResultsData';
import { Game } from './common/types/game.type';
import { Ranking } from './common/types/ranking.type';

import config from './common/config/config';
import { Stage } from './common/enums/stage.enum';

test().then(() => console.log('\nDone!'))

async function test(): Promise<void>{
  try {
    const gamesNoCup = config.STAGE === Stage.DEV ? readJSON('./mockData/gamesNoCup-mock.json') as Game[] : await fetchGames(false);
    const teamsData = extractTeamsData(gamesNoCup);
    
    const games = config.STAGE === Stage.DEV ? readJSON('./mockData/games-mock.json') as Game[] : await fetchGames(true);
    const rankings = config.STAGE === Stage.DEV ? readJSON('./mockData/rankings-mock.json') as Ranking[] : await fetchRankings();

    const upcomingGamesRaw: Game[] = [];
    const resultsRaw: Game[] = [];
    
    games.forEach(game => {
      if(game.setResults.length === 0){
        upcomingGamesRaw.push(game);
      } else {
        resultsRaw.push(game);
      }
    })

    const upcomingGamesData = extractUpcomingGamesData(upcomingGamesRaw, teamsData);
    const resultsData = extractResultsData(resultsRaw, teamsData);
    const teamRankingsData = extractRankingsData(rankings, teamsData);
  } catch (e) {
    console.error(e);
  }
}

function readJSON(uri: string){
  const jsonString = fs.readFileSync(path.join(__dirname, uri), 'utf-8');
  return JSON.parse(jsonString);
}