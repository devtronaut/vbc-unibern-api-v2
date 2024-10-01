type ResultTeamSchema = {
    caption: string
    setsWon: number
    sets: number[]
}

type ResultsSchema = {
    id: string
    teamId: number
    gameId: number
    dateUtc: string
    type: string
    winner: ResultTeamSchema
    loser: ResultTeamSchema
}

export type ResultPerTeamSchema = {
    teamId: number
    createdAt: string
    results: ResultsSchema[]
}
