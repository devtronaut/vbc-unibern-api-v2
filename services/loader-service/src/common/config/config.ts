import { Stage } from '../enums/stage.enum'

export type Tenant = {
    name: string,
    apiKey: string
}

export type Config = {
    STAGE: string,

    SWISSVOLLEY_API_GAMES_URL: string,
    SWISSVOLLEY_API_GAMES_WITH_CUP_URL: string,
    SWISSVOLLEY_API_RANKINGS_URL: string,

    TEAMS_TABLE_NAME: string,
    RESULTS_TABLE_NAME: string,
    RANKINGS_TABLE_NAME: string,
    UPCOMING_GAMES_TABLE_NAME: string,

    TENANTS: Tenant[]
}

const config = {
    // Stage can be 'dev' or 'int'
    STAGE: Stage.INT,

    SWISSVOLLEY_API_GAMES_URL: 'https://api.volleyball.ch/indoor/games',
    SWISSVOLLEY_API_GAMES_WITH_CUP_URL: 'https://api.volleyball.ch/indoor/games?includeCup=1',
    SWISSVOLLEY_API_RANKINGS_URL:
        'https://api.volleyball.ch/indoor/ranking',

    TEAMS_TABLE_NAME: 'teams_table',
    RESULTS_TABLE_NAME: 'results_table',
    RANKINGS_TABLE_NAME: 'rankings_table',
    UPCOMING_GAMES_TABLE_NAME: 'upcoming_games_table',

    TENANTS: [
        {
            name: process.env.TENANT1_NAME!,
            apiKey: process.env.TENANT1_API_KEY!
        }, 
        {
            name: process.env.TENANT2_NAME!,
            apiKey: process.env.TENANT2_API_KEY!
        },
    ]
}

function validateConfig(): Config {
    if (!process.env.TENANT1_NAME) throw new Error('Tenants must be specified with a name and an api key');
    if (!process.env.TENANT1_API_KEY) throw new Error('Tenants must be specified with a name and an api key');
    if (!process.env.TENANT2_NAME) throw new Error('Tenants must be specified with a name and an api key');
    if (!process.env.TENANT2_API_KEY) throw new Error('Tenants must be specified with a name and an api key');
    
    return config;
}

export default validateConfig();
