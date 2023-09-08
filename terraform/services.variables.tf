variable "services_bucket_name" {
  description = "The name of the S3 bucket to store the services."
  type        = string
}

variable "nodejs_version" {
  description = "The version of the nodejs runtime in the lambda."
  type        = string
}

variable "swissvolley_api_key" {
  description = "The api key for the swissvolley api."
  type        = string
}
