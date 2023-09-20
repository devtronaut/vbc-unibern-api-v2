import { UpcomingGamesPerTeamSchema } from '../common/types/upcomingGamesPerTeam.type';
import { getGamesOfTeam } from '../data/getGames';

export async function main(teamId: number): Promise<UpcomingGamesPerTeamSchema>{
  const games = await getGamesOfTeam(teamId);
  return games;
}