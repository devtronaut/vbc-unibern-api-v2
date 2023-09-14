import { Stage } from '../enums/stage.enum';

const config = {
  // Stage can be 'dev' or 'int'
  STAGE: Stage.INT,

  SWISSVOLLEY_API_GAMES_ENDPOINT: 'https://api.volleyball.ch/indoor/games',
  SWISSVOLLEY_API_RANKINGS_ENDPOINT: 'https://api.volleyball.ch/indoor/ranking'
}

export default config;