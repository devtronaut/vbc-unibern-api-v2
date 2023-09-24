import { Ranking } from '../common/types/ranking.type';
import { TeamSchema } from './extractTeamsData';

type RankDetailsSchema = {
  games: number,
  winsClear: number,
  winsNarrow: number,
  defeatsClear: number,
  defeatsNarrow: number,
  setsWon: number,
  setsLost: number,
  setQuota: number,
  ballsWon: number,
  ballsLost: number,
  ballQuota: number
}

type TeamRankingSchema = {
  rank: number,
  teamCaption: string,
  wins: number,
  defeats: number,
  points: number,
  rankDetails: RankDetailsSchema
}

export type RankingSchema = {
  id: string,
  teamId: number,
  leagueCaption: string,
  teams: TeamRankingSchema[],
  createdAt: string
}

export function extractRankingsData(rankings: Ranking[], teamsData: TeamSchema[]): RankingSchema[]{
  const teamRankings: RankingSchema[] = [];
  
  const groups = teamsData.map(team => team.group.groupId).filter((groupId, i, a) => a.indexOf(groupId) == i);
  const relevantRankings = rankings.filter(ranking => groups.includes(ranking.groupId));

  relevantRankings.forEach(ranking => {
    const teams = teamsData.filter(team => team.group.groupId === ranking.groupId);

    teams.forEach(team => {
      const rankingData = getRankingData(ranking, team);
      teamRankings.push(rankingData);
    })
  })

  return teamRankings;
}

function getRankingData(ranking: Ranking, team: TeamSchema): RankingSchema{
  const teams: TeamRankingSchema[] = [];

  ranking.ranking.forEach(rank => {
    const setQuota = rank.setsLost === 0 ? rank.setsWon : rank.setsWon / rank.setsLost;
    const ballQuota = rank.ballsLost === 0 ? rank.ballsWon : rank.ballsWon / rank.ballsLost;

    const rankDetails: RankDetailsSchema = {
      games: rank.games,
      winsClear: rank.winsClear,
      winsNarrow: rank.winsNarrow,
      defeatsClear: rank.defeatsClear,
      defeatsNarrow: rank.defeatsNarrow,
      setsWon: rank.setsWon,
      setsLost: rank.setsLost,
      setQuota,
      ballsWon: rank.ballsWon,
      ballsLost: rank.ballsWon,
      ballQuota
    }

    const teamRank: TeamRankingSchema = {
      rank: rank.rank,
      teamCaption: rank.teamCaption,
      wins: rank.wins,
      defeats: rank.defeats,
      points: rank.points,
      rankDetails
    }

    teams.push(teamRank);
  })
  
  const rankingData: RankingSchema = {
    id: team.id,
    teamId: team.teamId,
    leagueCaption: team.league.caption,
    teams: teams.sort((t1, t2) => t1.rank - t2.rank),
    createdAt: new Date().toISOString(),
  }

  return rankingData;
}