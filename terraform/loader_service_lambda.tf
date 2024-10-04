data "archive_file" "loader_lambda" {
  type = "zip"

  source_dir  = "${path.root}/../services/loader-service/dist"
  output_path = "${path.root}/../dist/loader-service.zip"
}

resource "aws_s3_object" "loader_lambda" {
  bucket = aws_s3_bucket.services_bucket.id

  key    = "loader-service.zip"
  source = data.archive_file.loader_lambda.output_path

  etag = filemd5(data.archive_file.loader_lambda.output_path)
}

resource "aws_lambda_function" "loader_lambda" {
  function_name = "loader-service"

  s3_bucket = aws_s3_bucket.services_bucket.id
  s3_key    = aws_s3_object.loader_lambda.key

  timeout     = 30
  memory_size = 256

  runtime = var.nodejs_version
  handler = "index.handler"

  source_code_hash = data.archive_file.loader_lambda.output_base64sha256

  role = aws_iam_role.loader_lambda.arn

  environment {
    variables = {
      TENANT1_NAME = var.tenant1_name
      TENANT1_API_KEY = var.tenant1_api_key

      TENANT2_NAME = var.tenant2_name
      TENANT2_API_KEY = var.tenant2_api_key
    }
  }
}

resource "aws_cloudwatch_log_group" "loader_lambda" {
  name = "/aws/lambda/${aws_lambda_function.loader_lambda.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "loader_lambda" {
  name = "loader_lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "loader_lambda" {
  role       = aws_iam_role.loader_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "loader_dynamodb_policy" {
  name = "dynamodb_lambda_policy"

  role = aws_iam_role.loader_lambda.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:BatchWriteItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable",
          "dynamodb:Scan"
        ],
        "Resource" : "${aws_dynamodb_table.teams_table.arn}"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:BatchWriteItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable",
          "dynamodb:Scan"
        ],
        "Resource" : "${aws_dynamodb_table.rankings_table.arn}"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:BatchWriteItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable",
          "dynamodb:Scan"
        ],
        "Resource" : "${aws_dynamodb_table.results_table.arn}"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:BatchWriteItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable",
          "dynamodb:Scan"
        ],
        "Resource" : "${aws_dynamodb_table.upcoming_games_table.arn}"
      }
    ]
  })
}
