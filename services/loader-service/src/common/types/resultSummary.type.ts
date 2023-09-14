import { Winner } from '../enums/winner.enum';

export interface ResultSummary {
  wonSetsHomeTeam: number;
  wonSetsAwayTeam: number;
  winner: Winner;
}