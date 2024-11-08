import { Game } from '../common/types/game.type';

export function extractTeamLogos(games: Game[]): Map<number, string> {
    const teamLogoMap = new Map<number, string>();

    games.map(game => (game.teams)).forEach(teams => {
        // Add team logos for both teams instead of only the home team and let the Map handle the dedup.
        // Some junior teams don't have home games (minis, small court, etc.), which makes for missing logos.

        const homeTeam = teams.home;
        const awayTeam = teams.away;

        teamLogoMap.set(homeTeam.teamId, homeTeam.logo);
        teamLogoMap.set(awayTeam.teamId, awayTeam.logo);

    return teamLogoMap;
}