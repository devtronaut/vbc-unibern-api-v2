resource "aws_apigatewayv2_api" "api_gw" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "OPTIONS", "*"]
    allow_headers = ["Content-Type", "Access-Control-Allow-Headers", "Authorization", "X-Requested-With", "*"]
    max_age       = 0
  }
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.api_gw.name}"

  retention_in_days = 30
}

resource "aws_apigatewayv2_stage" "api_gw" {
  api_id = aws_apigatewayv2_api.api_gw.id

  name        = "vbcunibern-api"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    })
  }
}
