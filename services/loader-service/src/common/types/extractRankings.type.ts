export type RankDetailsSchema = {
    games: number
    winsClear: number
    winsNarrow: number
    defeatsClear: number
    defeatsNarrow: number
    setsWon: number
    setsLost: number
    setQuota: number
    ballsWon: number
    ballsLost: number
    ballQuota: number
}

export type TeamRankingSchema = {
    rank: number
    teamCaption: string
    wins: number
    defeats: number
    points: number
    rankDetails: RankDetailsSchema
}

export type RankingSchema = {
    id: string
    teamId: number
    leagueCaption: string
    teams: TeamRankingSchema[]
    createdAt: string
}
