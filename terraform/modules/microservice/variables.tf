variable "services_bucket" {
  description = "ID of the bucket that stores all the microservice source files."
  type        = string
}

variable "source_dir" {
  description = "Name of the source code directory. Must be in /workspace/services/src. Must contain the handler function in a top-level file."
  type        = string
}

variable "function_name" {
  description = "Name of the lambda function in AWS."
  type        = string
}

variable "node_version" {
  description = "Node version used to run the lambda function. Find supported runtimes: https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html"
  type        = string
  default     = "nodejs18.x"
}

variable "handler_function" {
  description = "Name of the handler function when the lambda is called. Must be x.handler."
  type        = string
}

variable "lambda_environment" {
  description = "Environment variables for the lambda."

  type = object({
    SWISSVOLLEY_API_KEY = optional(string)
  })
}
