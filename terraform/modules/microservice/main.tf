data "archive_file" "microservice_lambda" {
  type = "zip"

  source_dir  = "${path.root}/../services/${var.source_dir}/dist"
  output_path = "${path.root}/../dist/${var.source_dir}.zip"
}

resource "aws_s3_object" "microservice_lambda" {
  bucket = var.services_bucket

  key    = "${var.source_dir}.zip"
  source = data.archive_file.microservice_lambda.output_path

  etag = filemd5(data.archive_file.microservice_lambda.output_path)
}

resource "aws_lambda_function" "microservice_lambda" {
  function_name = var.function_name

  s3_bucket = var.services_bucket
  s3_key    = aws_s3_object.microservice_lambda.key

  runtime = var.nodejs_version
  handler = var.handler_function

  source_code_hash = data.archive_file.microservice_lambda.output_base64sha256

  role = aws_iam_role.microservice_lambda.arn

  environment {
    variables = var.lambda_environment
  }
}

resource "aws_cloudwatch_log_group" "microservice_lambda" {
  name = "/aws/lambda/${aws_lambda_function.microservice_lambda.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "microservice_lambda" {
  name = "${var.function_name}_execution_role"

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

resource "aws_iam_role_policy_attachment" "microservice_lambda" {
  role       = aws_iam_role.microservice_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamodb-lambda-policy" {
  name = "dynamodb_lambda_policy"

  role = aws_iam_role.microservice_lambda.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : ["dynamodb:*"],
        "Resource" : "${aws_dynamodb_table.microservice_table.arn}"
      }
    ]
  })
}
