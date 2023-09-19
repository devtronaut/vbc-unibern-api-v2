import { Handler } from 'aws-lambda';
import { main } from './controller/controller';
export const handler: Handler = async () => {
  try{
    await main();
  
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: JSON.stringify('Teams, Results, Upcoming Games and rankings loaded successfully!'),
      }),
    };
  } catch(err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: JSON.stringify(`Loader could not perform all actions: \n${err}`),
      }),
    };
  }
}
