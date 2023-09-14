import { Gender } from '../enums/gender.enum';
import { Group } from './group.type';
import { Hall } from './hall.type';
import { League } from './league.type';
import { Phase } from './phase.type';
import { Referee } from './referee.type';
import { ResultSummary } from './resultSummary.type';
import { SetResult } from './setResult.type';
import { Teams } from './teams.type';

export interface Game {
  gameId: number;
  playDate: string;
  playDateUtc: string;
  gender: Gender;
  status: number;
  teams: Teams;
  league: League;
  phase: Phase;
  group: Group;
  hall: Hall;
  referees: any[] | { [key: string]: Referee };
  setResults: SetResult[];
  goldenSetResult: any[];
  resultSummary: ResultSummary;
}