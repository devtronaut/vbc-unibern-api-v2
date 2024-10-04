terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws",
      version = "5.8.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.0"
    }
  }

  required_version = "1.6.6"

  # backend "s3" {
  #   # check the backend folder for other parameters
  #   key = "vbcunibernapi/states/terraform.tfstate"
  # }
  backend "local" {}
}

provider "aws" {
  default_tags {
    tags = {
      app = "vbcunibern-api"
    }
  }
}
