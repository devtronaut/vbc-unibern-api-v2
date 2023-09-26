import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { main } from './controller/controller';
export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    if (!event || !event.queryStringParameters || !event.queryStringParameters.teamid) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: getErrorMessage(ErrorType.NO_PARAM),
        }),
      };
    }

    const teamId = Number.parseInt(event.queryStringParameters.teamid);
    const response = await main(teamId);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: JSON.stringify(`Games Service call failed: \n${err}`),
      }),
    };
  }
}

function getErrorMessage(type: ErrorType): string {
  switch (type) {
    case ErrorType.NO_PARAM:
      return 'No teamid parameter provided.';
    case ErrorType.UNSPECIFIC:
      return 'Games Service call failed';
  }
}

enum ErrorType {
  NO_PARAM,
  UNSPECIFIC
}