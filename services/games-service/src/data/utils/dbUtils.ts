import { GetCommand, GetCommandInput, QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './dbClient';

export async function getByIdFromTable<T>(id: number, projectionString: string, table: string): Promise<T> {
  console.log('Method called');

  try {
    const params: GetCommandInput = {
      TableName: table,
      Key: {
        'teamId': id
      },
      ProjectionExpression: projectionString
    }

    console.log(params);

    const response = await ddbDocClient.send(new GetCommand(params))
    console.log('Response: ', response);
    console.log(response.Item);
    return response.Item as T;
  } catch (err) {
    console.log(err);
    throw err;
  }
}