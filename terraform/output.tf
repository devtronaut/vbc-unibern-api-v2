output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.api_gw.invoke_url
}

output "hello_world_url" {
  value = "${aws_apigatewayv2_stage.api_gw.invoke_url}/hello-world"
}

output "bye_world_url" {
  value = "${aws_apigatewayv2_stage.api_gw.invoke_url}/bye-world"
}
