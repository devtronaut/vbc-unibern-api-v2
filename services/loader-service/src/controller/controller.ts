import { persistRankings, persistResults, persistTeams, persistUpcomingGames } from '../data/persist';
import { extractRankingsData } from '../extract/extractRankingsData';
import { extractResultsData } from '../extract/extractResultsData';
import { extractTeamsData } from '../extract/extractTeamsData';
import { extractUpcomingGamesData } from '../extract/extractUpcomingGamesData';
import { fetchGames, fetchGamesSeparated, fetchRankings } from '../extract/fetch';

export async function main(){
  // Fetch games (w/o cup), extract and persist teams data
  console.log('Starting to persist teams.');
  const gamesNoCup = await fetchGames(false);
  if(!gamesNoCup) return console.error('Error when fetching games for teams data (w/o cup).');
  const teamsData = extractTeamsData(gamesNoCup);
  const persistTeamsResult = await persistTeams(teamsData);
  if (!persistTeamsResult) throw new Error('Unable to persist teams.');

  // Fetch games (w/ cup), separated in upcoming games and played games
  const [upcomingGamesRaw, resultsRaw] = await fetchGamesSeparated(true);
  if (!upcomingGamesRaw || !resultsRaw) return console.error('Error when fetching games for upcoming games and results (w/ cup).');

  // Extract and persist upcoming games data
  console.log('Starting to persist upcoming games.');
  const upcomingGamesData = extractUpcomingGamesData(upcomingGamesRaw, teamsData);
  const persistUpcomingGamesResult = await persistUpcomingGames(upcomingGamesData);
  if (!persistUpcomingGamesResult) throw new Error('Unable to persist upcoming games.');

  // Extract and persist upcoming game results data
  console.log('Starting to persist game results.');
  const resultsData = extractResultsData(resultsRaw, teamsData);
  const persistResultsResult = await persistResults(resultsData);
  if (!persistResultsResult) throw new Error('Unable to persist game results.');

  // Fetch rankings, extract and persist data
  console.log('Starting to persist rankings.');
  const rankings = await fetchRankings();
  if (!rankings) return console.error('Error when fetching rankings.');
  const rankingsData = extractRankingsData(rankings, teamsData);
  const persistRankingsResult = await persistRankings(rankingsData);
  if (!persistRankingsResult) throw new Error('Unable to persist rankings.');
}