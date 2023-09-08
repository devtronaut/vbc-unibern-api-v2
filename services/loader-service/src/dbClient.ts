import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// Create DynamoDB client
const REGION = process.env.AWS_REGION;
const dbbClient = new DynamoDBClient({region: REGION});

export { dbbClient };

