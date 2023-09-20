import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import config from '../../common/config/config';
import { ddbDocClient } from './dbClient';

export async function getGamesById(teamId: number) {
  console.log('Method called');

  try {
    const params: QueryCommandInput = {
      TableName: config.RESULTS_TABLE,
      KeyConditionExpression: 'teamId = :teamId',
      ScanIndexForward: true,
      ExpressionAttributeValues: {
        ':teamId': teamId
      },
      IndexName: "TeamIdIndex"
    }

    console.log(params);

    const response = await ddbDocClient.send(new QueryCommand(params))
    console.log('Response: ', response);
    console.log(response.Items);
    return response.Items;
  } catch (err) {
    console.log(err);
    throw err;
  }
}