import { RankingElement } from './rankingElement.type';

export interface Ranking {
  leagueId: number;
  phaseId: number;
  groupId: number;
  ranking: RankingElement[];
}