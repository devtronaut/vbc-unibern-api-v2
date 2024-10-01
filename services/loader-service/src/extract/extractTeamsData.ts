import { Game } from '../common/types/game.type'
import { Team } from '../common/types/teams.type'

type GroupSchema = {
    groupId: number
    caption: string
}

type LeagueSchema = {
    leagueId: number
    caption: string
    gender: string
}

type ClubSchema = {
    clubId: number
    caption: string
}

export type TeamSchema = {
    id: string
    teamId: number
    caption: string
    league: LeagueSchema
    group: GroupSchema
    club: ClubSchema
    createdAt: string
}

export function extractTeamsData(games: Game[]): TeamSchema[] {
    const dedupTeamData = new Map<number, TeamSchema>()

    games.forEach( (game) => {
        const unibernRegex = new RegExp(/\buni\sbern\b/i)
        const homeTeamMatch = isClubTeam(unibernRegex, game.teams.home.caption);
        const awayTeamMatch = isClubTeam(unibernRegex, game.teams.away.caption);

        // Ignore cases, where none of the teams is an actual club team (e.g., club associated RTS team plays other non-club team)
        if(!homeTeamMatch && !awayTeamMatch) return;

        const team = homeTeamMatch ? game.teams.home : game.teams.away;

            dedupTeamData.set(team.teamId, getTeamData(game, team))
    })

    return Array.from(dedupTeamData.values())
}

function isClubTeam(clubRegex: RegExp, teamName: string): boolean {
    return clubRegex.test(teamName.toLowerCase());
}

function getTeamData(game: Game, team: Team): TeamSchema {
    const rawCaption = game.league.translations.d

    const leagueCaption = rawCaption.includes('|')
        ? rawCaption.split('|')[1].trim().split(' ')[0]
        : rawCaption
    const leagueGender = game.gender

    const teamCaption = team.caption.trim()
    const teamSpecifier =
        teamCaption.endsWith('a') || teamCaption.endsWith('b')
            ? teamCaption[teamCaption.length - 1]
            : ''

    const id = (leagueCaption + leagueGender + teamSpecifier)
        .toLowerCase()
        .replace(' ', '')
        .replace('-', '')

    const rawLeague = game.league.translations.d

    return {
        id,
        teamId: team.teamId,
        caption: team.caption.trim(),
        league: {
            leagueId: game.league.leagueId,
            caption: rawLeague.includes('|')
                ? rawLeague.split('|')[1].trim()
                : rawCaption,
            gender: game.gender,
        },
        group: {
            groupId: game.group.groupId,
            caption: game.group.translations.shortD,
        },
        club: {
            clubId: parseInt(team.clubId),
            caption: team.clubCaption,
        },
        createdAt: new Date().toISOString(),
    }
}
