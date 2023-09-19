import { APIGatewayProxyEvent } from 'aws-lambda';

export async function main(event: APIGatewayProxyEvent){
  console.log(event);
}