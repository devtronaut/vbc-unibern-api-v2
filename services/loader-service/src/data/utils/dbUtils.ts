import { ddbDocClient } from './dbClient';
import { BatchWriteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function batchWrite<T>(data: T[], tableName: string){
  try{
    const putRequests: any[] = [];
    const batches: any[] = [];
    let putRequestsInBatch: number = 0;
  

    data.forEach(item => {
      const putRequest = { PutRequest: { Item: item }}
      putRequests.push(putRequest);

      putRequestsInBatch += 1;
      if (putRequestsInBatch === 25){
        batches.push(putRequests.splice(0, putRequests.length));
        putRequestsInBatch = 0;
      }
    })

    batches.forEach(async batch => {
      const params = {
        RequestItems: {
          [tableName]: batch
        }
      };

      const response = await ddbDocClient.send(new BatchWriteCommand(params));
      console.log(response);
    })

    return;
  } catch(err){
    console.error(err);
    throw err;
  }
}

export async function getTeamById(id: number){
  try{
    const params = {
      TableName: "teams_table",
      Key: {
        teamId: id
      }
    };

    const response = await ddbDocClient.send(new GetCommand(params))
    return response;
  } catch(err){
    throw err;
  }
}