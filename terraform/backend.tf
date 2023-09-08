/*
* Resources in AWS to store the tfstate (backend resources)
* - S3 Bucket
* - DynamoDB Table
*
* @author Devtronaut
*/

resource "aws_s3_bucket" "terraform_state" {
  bucket = var.tfstate_bucket_name

  lifecycle {
    # prevent accidental deletion
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "tfs_versioning_enabled" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tfs_enc" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tfs_public_access" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "tfs_state_lock" {
  name         = var.tfstate_locktable_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.tfstate_locktable_hashkey

  attribute {
    name = var.tfstate_locktable_hashkey
    type = "S"
  }
}
