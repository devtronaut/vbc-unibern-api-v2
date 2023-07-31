output "cloudwatch_log_group_arn" {
  description = "ARN of the microservice's cloudwatch log group."
  value       = aws_cloudwatch_log_group.microservice_lambda.arn
}

output "lambda_invoke_arn" {
  description = "Invocation ARN of the microservice lambda."
  value       = aws_lambda_function.microservice_lambda.invoke_arn
}

output "lambda_function_name" {
  description = "The name of the lambda function in AWS."
  value       = aws_lambda_function.microservice_lambda.function_name
}
