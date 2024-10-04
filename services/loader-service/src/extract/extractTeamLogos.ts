import { Game } from '../common/types/game.type';

export function extractTeamLogos(games: Game[]): Map<number, string> {
    if (games?.length === 0) throw new Error('No games were passed to extract logos. Games array was undefined or empty.')

    const teamLogoMap = new Map<number, string>();

    games.map(game => (game.teams.home)).forEach(team => {
        teamLogoMap.set(team.teamId, team.logo);
    });

    return teamLogoMap;
}