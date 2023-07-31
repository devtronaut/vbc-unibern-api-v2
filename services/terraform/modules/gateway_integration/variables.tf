variable "gw_api_id" {
  description = "ID of the gateway api."
  type        = string
}

variable "gw_api_name" {
  description = "Name of the gateway api."
  type        = string
}

variable "lambda_invoke_arn" {
  description = "Invocation ARN of the microservice lambda."
  type        = string
}

variable "lambda_execution_arn" {
  description = "Execution ARN of the gateway api."
  type = string
}

variable "function_name" {
  description = "Name of the lambda function in AWS."
  type        = string
}

variable "http_method" {
  description = "HTTP method to use for the gateway integration."
  type = string

  validation {
    condition = contains(["GET", "POST"], var.http_method)
    error_message = "HTTP method must be 'GET' or 'POST'."
  }
}
