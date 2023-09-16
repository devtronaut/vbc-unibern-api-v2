import { ddbDocClient } from './dbClient';
import { BatchWriteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function batchWrite<T>(data: T[], tableName: string){
  try{
    const putRequests: any[] = [];
    const batches: any[] = [];
    let putRequestsInBatch: number = 0;
  
    console.log(`About to persist ${data.length} items.`);
    data.forEach((item, idx) => {
      const putRequest = { PutRequest: { Item: item }}
      putRequests.push(putRequest);

      putRequestsInBatch += 1;
      if (putRequestsInBatch === 25){
        batches.push(putRequests.splice(0, putRequests.length));
        putRequestsInBatch = 0;
      }

      if(idx === data.length - 1 && putRequestsInBatch > 0){
        batches.push(putRequests);
        putRequestsInBatch = 0;
      }
    })

    for(const batch of batches){
      console.log(`Persisting batch of ${batch.length} items.`);
      const params = {
        RequestItems: {
          [tableName]: batch,
        },
        ReturnConsumedCapacity: 'TOTAL'
      };

      const response = await ddbDocClient.send(new BatchWriteCommand(params));
      console.log('Batch saved. Status: ' + response.$metadata.httpStatusCode);
    }
  } catch(err){
    console.log(err);
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