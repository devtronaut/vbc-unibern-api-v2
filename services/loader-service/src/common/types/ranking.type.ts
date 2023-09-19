export interface Ranking {
  leagueId: number;
  phaseId: number;
  groupId: number;
  ranking: RankingElement[];
}

interface RankingElement {
  rank: number;
  teamId: number;
  teamCaption: string;
  games: number;
  points: number;
  wins: number;
  winsClear: number;
  winsNarrow: number;
  defeats: number;
  defeatsClear: number;
  defeatsNarrow: number;
  setsWon: number;
  setsLost: number;
  ballsWon: number;
  ballsLost: number;
}