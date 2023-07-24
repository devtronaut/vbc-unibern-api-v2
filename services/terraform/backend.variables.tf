/*
* Variable definitions required for the tf backend.
*
* @author Devtronaut
*/

variable "tfstate_bucket_name" {
  default     = ""
  description = "The name of the S3 bucket to store the tfstate."
}

variable "tfstate_locktable_name" {
  default     = ""
  description = "The name of the DynamoDB table that holds the state lock."
}

variable "tfstate_locktable_hashkey" {
  default     = ""
  description = "The hashkey for the state lock table in DynamoDB."
}
