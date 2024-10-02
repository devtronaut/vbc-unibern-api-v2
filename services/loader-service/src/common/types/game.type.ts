import { Gender } from '../enums/gender.enum'
import { Winner } from '../enums/winner.enum'
import { Team } from './teams.type'

export interface Game {
    gameId: number
    playDate: string
    playDateUtc: string
    gender: Gender
    status: number
    teams: Teams
    league: League
    phase: Phase
    group: Group
    hall: Hall
    referees: unknown[] | { [key: string]: Referee } // TODO create better type for referees to avoid unknown
    setResults: SetResult[]
    goldenSetResult: unknown[] // TODO create better type for goldenSetResult to avoid unknown
    resultSummary: ResultSummary
}

interface Teams {
    home: Team
    away: Team
}

interface League {
    leagueId: number
    leagueCategoryId: number
    caption: string
    translations: Translations
}

export interface Phase {
    phaseId: number
    caption: string
    translations: Translations
}

interface Group {
    groupId: number
    caption: string
    translations: Translations
}

interface Hall {
    hallId: number
    caption: string
    street: string
    number: string
    zip: string
    city: string
    latitude: number
    longitude: number
    plusCode: string
}

interface Referee {
    refereeId: number
    lastName: string
    firstName: string
}

export interface ResultSummary {
    wonSetsHomeTeam: number
    wonSetsAwayTeam: number
    winner: Winner
}

interface SetResult {
    home: number
    away: number
}

interface Translations {
    d: string
    shortD: string
    f: string
    shortF: string
}
