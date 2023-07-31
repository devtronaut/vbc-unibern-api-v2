module "hello-world-microservice" {
  source = "./modules/microservice"

  services_bucket  = aws_s3_bucket.services_bucket.id
  source_dir       = "hello-world"
  function_name    = "hello-world"
  node_version     = "nodejs18.x"
  handler_function = "hello.handler"
}
