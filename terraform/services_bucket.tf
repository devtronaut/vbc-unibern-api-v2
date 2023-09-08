resource "aws_s3_bucket" "services_bucket" {
  bucket = var.services_bucket_name

  lifecycle {
    # prevent accidental deletion
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "s_versioning_enabled" {
  bucket = aws_s3_bucket.services_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s_enc" {
  bucket = aws_s3_bucket.services_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "s_public_access" {
  bucket = aws_s3_bucket.services_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
