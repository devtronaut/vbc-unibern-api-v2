import config from '../common/config/config';
import { RankingSchema } from '../common/types/rankingByTeam.type';
import { getByIdFromTable } from './utils/dbUtils';

export async function getRankingOfTeam(teamId: number): Promise<RankingSchema> {
  const projection = "teams";
  return await getByIdFromTable<RankingSchema>(teamId, projection, config.RANKINGS_TABLE);
}