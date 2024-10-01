import { Stage } from '../enums/stage.enum'

const config = {
    // Stage can be 'dev' or 'int'
    STAGE: Stage.INT,

    SWISSVOLLEY_API_GAMES_ENDPOINT: 'https://api.volleyball.ch/indoor/games',
    SWISSVOLLEY_API_RANKINGS_ENDPOINT:
        'https://api.volleyball.ch/indoor/ranking',

    TEAMS_TABLE_NAME: 'teams_table',
    RESULTS_TABLE_NAME: 'results_table',
    RANKINGS_TABLE_NAME: 'rankings_table',
    UPCOMING_GAMES_TABLE_NAME: 'upcoming_games_table',
}

export default config
