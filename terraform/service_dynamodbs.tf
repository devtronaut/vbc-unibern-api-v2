resource "aws_dynamodb_table" "teams_table" {
  name         = "teams_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "teamId"

  attribute {
    name = "teamId"
    type = "N"
  }
}

resource "aws_dynamodb_table" "rankings_table" {
  name         = "rankings_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "teamId"

  attribute {
    name = "teamId"
    type = "N"
  }
}

resource "aws_dynamodb_table" "results_table" {
  name         = "results_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "teamId"

  attribute {
    name = "teamId"
    type = "N"
  }
}

resource "aws_dynamodb_table" "upcoming_games_table" {
  name         = "upcoming_games_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "teamId"

  attribute {
    name = "teamId"
    type = "N"
  }
}
