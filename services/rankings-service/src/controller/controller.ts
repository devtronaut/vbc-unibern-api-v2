import { RankingSchema } from '../common/types/rankingByTeam.type';
import { getRankingOfTeam } from '../data/getRankings';

export async function main(teamId: number): Promise<RankingSchema> {
  const ranking = await getRankingOfTeam(teamId);
  return ranking;
}