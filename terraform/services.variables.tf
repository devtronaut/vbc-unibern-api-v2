variable "services_bucket_name" {
  description = "The name of the S3 bucket to store the services."
  type        = string
}

variable "nodejs_version" {
  description = "The version of the nodejs runtime in the lambda."
  type        = string
}

variable "tenant1_name" {
  description = "The club name for a tenant"
}

variable "tenant1_api_key" {
  description = "The api key of volley uni bern for the tenant."
  type        = string
}

variable "tenant2_name" {
  description = "The club name for a tenant"
  type        = string
}


variable "tenant2_api_key" {
  description = "The api key of volley uni bern for the tenant."
  type        = string
}