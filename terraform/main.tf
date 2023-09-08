module "hello-world-microservice" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "hello-world"
  function_name    = "hello-world"
  node_version     = "nodejs18.x"
  handler_function = "hello.handler"
}

module "hello-world-gateway-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.hello-world-microservice.lambda_invoke_arn
  function_name        = module.hello-world-microservice.lambda_function_name
  http_method          = "GET"
}

module "bye-world-microservice" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "bye-world"
  function_name    = "bye-world"
  node_version     = "nodejs18.x"
  handler_function = "bye.handler"
}

module "bye-world-gateway-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.bye-world-microservice.lambda_invoke_arn
  function_name        = module.bye-world-microservice.lambda_function_name
  http_method          = "GET"
}
