import config from '../common/config/config';
import { deleteBeforeDate } from './utils/dbUtils';

export async function cleanupTeams(date: string){
  try {
    await deleteBeforeDate(date, config.TEAMS_TABLE);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function cleanupRankings(date: string) {
  try {
    await deleteBeforeDate(date, config.RANKINGS_TABLE);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function cleanupResults(date: string) {
  try {
    await deleteBeforeDate(date, config.RESULTS_TABLE);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function cleanupUpcomingGames(date: string) {
  try {
    await deleteBeforeDate(date, config.UPCOMING_GAMES_TABLE);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}