output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.api_gw.invoke_url
}

output "games_url" {
  value = "${aws_apigatewayv2_stage.api_gw.invoke_url}/games-service?teamid=<id>"
}
