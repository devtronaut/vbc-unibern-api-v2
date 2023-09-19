import { GameType } from '../enums/gameType.enum'

type LocationSchema = {
  caption: string,
  street: string,
  number: string,
  zip: string,
  city: string,
  plusCode: string
}

type UpcomingGamesSchema = {
  id: string,
  teamId: number,
  gameId: number,
  dateUtc: string,
  league: string,
  opponent: string,
  type: GameType,
  location: LocationSchema,
}

export type UpcomingGamesPerTeamSchema = {
  teamId: number,
  createdAt: string,
  upcomingGames: UpcomingGamesSchema[]
}