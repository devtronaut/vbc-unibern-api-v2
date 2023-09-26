variable "services_bucket_name" {
  description = "The name of the S3 bucket to store the services."
  type        = string
}

variable "nodejs_version" {
  description = "The version of the nodejs runtime in the lambda."
  type        = string
}

variable "swissvolley_api_key_vbcunibern" {
  description = "The api key of vbc uni bern for the swissvolley api."
  type        = string
}

variable "swissvolley_api_key_volleyunibern" {
  description = "The api key of volley uni bern for the swissvolley api."
  type        = string
}