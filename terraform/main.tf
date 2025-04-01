# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}

# Configure the Terraform backend for state storage
terraform {
  backend "s3" {
    bucket = "terraform-bucket"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
  }
}

# Define variables
variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t3.medium"
}

variable "ami_id" {
  default = "ami-12345678"  # Replace with a valid AMI ID
}

# Create an EC2 instance
resource "aws_instance" "hotel_server" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name = "HotelInstance"
  }
}

# Output instance ID
output "instance_id" {
  value = aws_instance.hotel_server.id
}