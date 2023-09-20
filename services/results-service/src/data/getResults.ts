import config from '../common/config/config';
import { ResultPerTeamSchema } from '../common/types/resultsPerTeam.type';
import { getByIdFromTable } from './utils/dbUtils';

export async function getResultsOfTeam(teamId: number): Promise<ResultPerTeamSchema>{
  const projection = "results"
  return await getByIdFromTable<ResultPerTeamSchema>(teamId, projection, config.RESULTS_TABLE)
}