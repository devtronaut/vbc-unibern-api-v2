### Base Image 
ARG NODE_VARIANT=1-20-bullseye
FROM mcr.microsoft.com/devcontainers/typescript-node:${NODE_VARIANT}

### Environment Variables
ENV TERRAFORM_VERSION 1.5.2
ENV LOCALSTACK_VERSION 2.2.0

### Install terraform
RUN wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip
RUN unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/local/bin
RUN terraform -v

### Install aws cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN aws --version