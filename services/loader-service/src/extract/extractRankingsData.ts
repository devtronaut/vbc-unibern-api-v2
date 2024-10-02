import {
    RankDetailsSchema,
    RankingSchema,
    TeamRankingSchema,
} from '../common/types/extractRankings.type'
import { Ranking, RankingElement } from '../common/types/ranking.type'
import { TeamSchema } from './extractTeamsData'

export function extractRankingsData(
    rankings: Ranking[],
    teamsData: TeamSchema[]
): RankingSchema[] {
    const teamRankings: RankingSchema[] = []

    const groups = teamsData
        .map(team => team.group.groupId)
        .filter((groupId, i, a) => a.indexOf(groupId) == i)

    const relevantRankings = rankings.filter(ranking =>
        groups.includes(ranking.groupId)
    )

    relevantRankings.forEach(ranking => {
        const dedupRanking = ranking.ranking.filter(
            (value, idx, self) =>
                idx === self.findIndex(v => value.teamId === v.teamId)
        )

        const teams = teamsData.filter(
            team => team.group.groupId === ranking.groupId
        )

        teams.forEach(team => {
            const rankingData = getRankingData(dedupRanking, team)
            teamRankings.push(rankingData)
        })
    })

    return teamRankings
}

function getRankingData(
    ranking: RankingElement[],
    team: TeamSchema
): RankingSchema {
    const teams: TeamRankingSchema[] = ranking.map(r => {
        const {
            rank,
            teamCaption,
            wins,
            defeats,
            points,
            games,
            winsClear,
            winsNarrow,
            defeatsClear,
            defeatsNarrow,
            setsWon,
            setsLost,
            ballsWon,
            ballsLost,
        } = r

        const rankDetails: RankDetailsSchema = {
            games,
            winsClear,
            winsNarrow,
            defeatsClear,
            defeatsNarrow,
            setsWon,
            setsLost,
            setQuota: resolveQuota(setsWon, setsLost),
            ballsWon,
            ballsLost,
            ballQuota: resolveQuota(ballsWon, ballsLost),
        }

        return {
            rank,
            teamCaption,
            wins,
            defeats,
            points,
            rankDetails,
        }
    })

    return {
        id: team.id,
        teamId: team.teamId,
        leagueCaption: team.league.caption,
        teams: teams.sort((t1, t2) => t1.rank - t2.rank),
        createdAt: new Date().toISOString(),
    }
}

/**
 * Resolves the quota, so that the dividend is returned, if the divisor is 0.
 * Therefore eliminates zero division errors.
 *
 * @param dividend the dividend
 * @param divisor the divisor
 * @returns the dividend if the divisor is 0, the quotient (quota) otherwise
 */
function resolveQuota(dividend: number, divisor: number) {
    return divisor === 0 ? dividend : dividend / divisor
}
