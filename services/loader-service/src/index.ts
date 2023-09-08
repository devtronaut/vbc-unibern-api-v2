import { Handler, APIGatewayEvent } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayEvent) => {
  console.log('Event: ', event);
  let responseMessage: String = 'Hello, World! From ' + process.env.AWS_REGION;

  if (event.queryStringParameters && event.queryStringParameters['name']) {
    let qsp: string = event.queryStringParameters['name'];
    responseMessage = `Hello, ${qsp}!`;
  }

  let responseHeader = {
    'Content-Type': 'application/json',
  }

  return {
    statusCode: 200,
    headers: responseHeader,
    body: JSON.stringify({
      message: responseMessage,
    }),
  };
}