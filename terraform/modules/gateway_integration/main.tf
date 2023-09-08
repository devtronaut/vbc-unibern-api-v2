resource "aws_apigatewayv2_integration" "gw_integration" {
  api_id = var.gw_api_id

  integration_uri    = var.lambda_invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "gw_route" {
  api_id = var.gw_api_id

  route_key = "${var.http_method} /${var.function_name}"
  target    = "integrations/${aws_apigatewayv2_integration.gw_integration.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.lambda_execution_arn}/*/*"
}
