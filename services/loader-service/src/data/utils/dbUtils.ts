import { DescribeTableCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { ddbDocClient } from './dbClient';
import { BatchWriteCommand, BatchWriteCommandInput, DeleteCommand, DeleteCommandInput, GetCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';

export async function batchWrite<T>(data: T[], tableName: string){
  try{
    const putRequests: any[] = [];
  
    console.log(`About to persist ${data.length} items.`);
    data.forEach(item => {
      const putRequest = { PutRequest: { Item: item }}
      putRequests.push(putRequest);
    })

    const batches = sliceArrayIntoGroups(putRequests, 25);

    for(const batch of batches){
      console.log(`Persisting batch of ${batch.length} items.`);
      const params: BatchWriteCommandInput = {
        RequestItems: {
          [tableName]: batch,
        },
        ReturnConsumedCapacity: 'TOTAL'
      };

      const response = await ddbDocClient.send(new BatchWriteCommand(params));
      console.log('Batch saved. Status: ' + response.$metadata.httpStatusCode);
    }
  } catch(err){
    console.error(err);
    throw err;
  }
}

export async function clearTable(tableName: string){
  try{
    const tableNameParams = { TableName: tableName }

    const describeResponse = await ddbDocClient.send(new DescribeTableCommand(tableNameParams));
    const keyHash = describeResponse.Table?.KeySchema?.find(key => key.KeyType === "HASH")?.AttributeName;
    const scanResponse = await ddbDocClient.send(new ScanCommand(tableNameParams));

    if(!scanResponse.Items || scanResponse.Items.length === 0){
      console.log(`No items found to delete from ${tableName}.`);
      return;
    }

    console.log(`Will delete ${scanResponse.Items.length} items from ${tableName}`);
    const batches = sliceArrayIntoGroups(scanResponse.Items, 25);

    for(const batch of batches){
      console.log(`Deleting batch of ${batch.length} items. ${keyHash}`)
      const params: BatchWriteCommandInput = {
        RequestItems: {
          [tableName]: batch.map(item => ({
            DeleteRequest: {
              Key: {
                [`${keyHash}`]: Number.parseInt(item[`${keyHash}`].N!)
              }
            }
          }))
        }
      }

      const deleteResponse = await ddbDocClient.send(new BatchWriteCommand(params));
      console.log('Batch deleted. Status: ' + deleteResponse.$metadata.httpStatusCode);
    }
  } catch (err) {
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

function sliceArrayIntoGroups<T>(array: T[], maxPerGroup: number): T[][]{
  const groups: T[][] = [];

  for(let index = 0; index < array.length; index += maxPerGroup){
    groups.push(array.slice(index, index + maxPerGroup));
  }

  return groups;
}