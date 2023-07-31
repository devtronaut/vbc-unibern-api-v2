/*
* Variable definitions required for the tf backend.
*
* @author Devtronaut
*/

variable "tfstate_bucket_name" {
  description = "The name of the S3 bucket to store the tfstate."
  type        = string
}

variable "tfstate_locktable_name" {
  description = "The name of the DynamoDB table that holds the state lock."
  type        = string
}

variable "tfstate_locktable_hashkey" {
  description = "The hashkey for the state lock table in DynamoDB."
  type        = string
}
