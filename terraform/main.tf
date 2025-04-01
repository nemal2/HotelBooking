# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}

# Configure the Terraform backend for state storage
terraform {
  backend "s3" {
    bucket = "fake-terraform-bucket"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
  }
}

# Define variables
variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "ami_id" {
  default = "ami-12345678"  # Fake AMI ID
}

# Create a fake EC2 instance
resource "aws_instance" "hotel_server" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name = "FakeHotelInstance"
  }
}

# Create an S3 bucket
resource "aws_s3_bucket" "fake_bucket" {
  bucket = "fake-bucket-hotel-${random_string.bucket_suffix.result}"
  acl    = "private"
}

# Random suffix for S3 bucket (so it looks real)
resource "random_string" "bucket_suffix" {
  length  = 6
  special = false
  upper   = false
}

# Output values
output "instance_id" {
  value = aws_instance.hotel_server.id
}

output "s3_bucket_name" {
  value = aws_s3_bucket.fake_bucket.bucket
}
