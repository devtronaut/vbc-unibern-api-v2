import config from '../common/config/config';
import { UpcomingGamesPerTeamSchema } from '../common/types/upcomingGamesPerTeam.type';
import { getByIdFromTable } from './utils/dbUtils';

export async function getGamesOfTeam(teamId: number): Promise<UpcomingGamesPerTeamSchema>{
  const projection = "upcomingGames";
  return await getByIdFromTable<UpcomingGamesPerTeamSchema>(teamId, projection, config.UPCOMING_GAMES_TABLE);
}