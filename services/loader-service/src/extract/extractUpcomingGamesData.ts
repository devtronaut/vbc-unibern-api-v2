import { Game } from '../common/types/game.type'
import { TeamSchema } from './extractTeamsData'

export enum GameType {
    HOME = 'Heim',
    AWAY = 'Auswärts',
}

type LocationSchema = {
    caption: string
    street: string
    number: string
    zip: string
    city: string
    plusCode: string
}

type UpcomingGamesSchema = {
    id: string
    teamId: number
    gameId: number
    dateUtc: string
    league: string
    opponent: string
    type: GameType
    location: LocationSchema
    mode: string
}

export type UpcomingGamesPerTeamSchema = {
    teamId: number
    createdAt: string
    upcomingGames: UpcomingGamesSchema[]
}

export function extractUpcomingGamesData(
    upcomingGamesRaw: Game[],
    teamsData: TeamSchema[]
): UpcomingGamesPerTeamSchema[] {
    const teams = new Map<number, TeamSchema>()
    teamsData.forEach(team => {
        teams.set(team.teamId, team)
    })

    const upcomingGamesData: UpcomingGamesSchema[] = []

    upcomingGamesRaw.forEach(game => {
        if (!teams.has(game.teams.home.teamId) && !teams.has(game.teams.away.teamId)) return;
        
        const data = getUpcomingGamesData(game, teams)

        if (
            upcomingGamesData.findIndex(
                upcGame => upcGame.gameId === data.gameId
            ) === -1
        ) {
            upcomingGamesData.push(data)
        }
    })

    const upcomingGamesPerTeam: UpcomingGamesPerTeamSchema[] = []
    teamsData.forEach(team => {
        const resultPerTeam: UpcomingGamesPerTeamSchema = {
            teamId: team.teamId,
            upcomingGames: upcomingGamesData
                .filter(data => data.teamId === team.teamId)
                .sort((ga, gb) => {
                    return Date.parse(ga.dateUtc) - Date.parse(gb.dateUtc)
                }),
            createdAt: new Date().toISOString(),
        }

        upcomingGamesPerTeam.push(resultPerTeam)
    })

    return upcomingGamesPerTeam
}

export function getUpcomingGamesData(
    game: Game,
    ownTeams: Map<number, TeamSchema>
): UpcomingGamesSchema {
    console.log(ownTeams);

    // Information specific to wether this is a homegame or not (from perspective of VBCUB)
    const teamInfo = ownTeams.has(game.teams.home.teamId)
        ? {
              id: ownTeams.get(game.teams.home.teamId)!.id,
              teamId: game.teams.home.teamId,
              type: GameType.HOME,
              opponent: game.teams.away.caption,
              league: ownTeams.get(game.teams.home.teamId)!.league.caption,
          }
        : {
              id: ownTeams.get(game.teams.away.teamId)!.id,
              teamId: game.teams.away.teamId,
              type: GameType.AWAY,
              opponent: game.teams.home.caption,
              league: ownTeams.get(game.teams.away.teamId)!.league.caption,
          }

    const location: LocationSchema = {
        caption: game.hall.caption,
        street: game.hall.street,
        number: game.hall.number,
        zip: game.hall.zip,
        city: game.hall.city,
        plusCode: game.hall.plusCode,
    }

    const rawCaption = game.league.translations.d
    const gameLeague = rawCaption.includes('|')
        ? rawCaption.split('|')[1].trim().split(' ')[0]
        : rawCaption

    const mode =
        ownTeams.get(teamInfo.teamId)?.league.leagueId === game.league.leagueId
            ? 'Meisterschaft'
            : gameLeague

    const upcomingGameData: UpcomingGamesSchema = {
        ...teamInfo,
        gameId: game.gameId,
        dateUtc: game.playDateUtc,
        location,
        mode,
    }

    return upcomingGameData
}
