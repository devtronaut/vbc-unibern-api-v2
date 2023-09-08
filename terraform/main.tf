/*
* Loader Service lambda and gw-integration
*/
module "loader-service" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "loader-service"
  function_name    = "loader-service"
  node_version     = var.nodejs_version
  handler_function = "index.handler"

  lambda_environment = {
    SWISSVOLLEY_API_KEY = var.swissvolley_api_key
  }
}

module "loader-gw-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.loader-service.lambda_invoke_arn
  function_name        = module.loader-service.lambda_function_name
  http_method          = "GET"
}

/*
* Games Service lambda and gw-integration
*/
module "games-service" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "games-service"
  function_name    = "games-service"
  node_version     = var.nodejs_version
  handler_function = "index.handler"

  lambda_environment = {}
}

module "games-gw-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.games-service.lambda_invoke_arn
  function_name        = module.games-service.lambda_function_name
  http_method          = "GET"
}

/*
* Rankings Service lambda and gw-integration
*/
module "rankings-service" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "rankings-service"
  function_name    = "rankings-service"
  node_version     = var.nodejs_version
  handler_function = "index.handler"

  lambda_environment = {}
}

module "rankings-gw-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.rankings-service.lambda_invoke_arn
  function_name        = module.rankings-service.lambda_function_name
  http_method          = "GET"
}

/*
* Results Service lambda and gw-integration
*/
module "results-service" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "results-service"
  function_name    = "results-service"
  node_version     = var.nodejs_version
  handler_function = "index.handler"

  lambda_environment = {}
}

module "results-gw-integration" {
  source = "./modules/gateway_integration"

  gw_api_id            = aws_apigatewayv2_api.api_gw.id
  gw_api_name          = aws_apigatewayv2_api.api_gw.name
  lambda_execution_arn = aws_apigatewayv2_api.api_gw.execution_arn
  lambda_invoke_arn    = module.results-service.lambda_invoke_arn
  function_name        = module.results-service.lambda_function_name
  http_method          = "GET"
}
