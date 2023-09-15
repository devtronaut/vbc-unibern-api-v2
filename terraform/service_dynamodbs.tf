resource "aws_dynamodb_table" "teams_table" {
  name         = "teams_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "teams_table_id"

  attribute {
    name = "teams_table_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "rankings_table" {
  name         = "rankings_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "rankings_table_id"

  attribute {
    name = "rankings_table_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "results_table" {
  name         = "results_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "results_table_id"

  attribute {
    name = "results_table_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "upcoming_games_table" {
  name         = "upcoming_games_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "upcoming_games_table_id"

  attribute {
    name = "upcoming_games_table_id"
    type = "S"
  }
}
