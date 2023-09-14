import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

if(!process.env.AWS_REGION){
  throw new Error(`Environment variable AWS_REGION is not defined. Connection to dynamodb won't be established.`);
}

// Create DynamoDB client
const REGION: string = process.env.AWS_REGION;

const dbbClient = new DynamoDBClient({region: REGION});

export { dbbClient };

