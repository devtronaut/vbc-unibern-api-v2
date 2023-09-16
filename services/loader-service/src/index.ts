import { Handler, APIGatewayEvent } from 'aws-lambda';
import { main } from './controller/controller';

export const handler: Handler = async (event: APIGatewayEvent) => {
  await main().then(() => {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: JSON.stringify('Teams, Results, Upcoming Games and rankings loaded successfully!'),
      }),
    };
  }).catch(err => {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: JSON.stringify(`Loader could not perform all actions: \n${err}`),
      }),
    };
  });
}
