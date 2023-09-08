resource "aws_dynamodb_table" "microservice_table" {
  name         = var.function_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "${var.function_name}_id"

  attribute {
    name = "${var.function_name}_id"
    type = "S"
  }
}
