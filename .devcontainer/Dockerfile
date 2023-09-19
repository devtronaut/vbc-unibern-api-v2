### Base Image 
ARG NODE_VARIANT=1-20-bullseye
FROM mcr.microsoft.com/devcontainers/typescript-node:${NODE_VARIANT}

### Install terraform
ARG TERRAFORM_VERSION=1.5.7
RUN wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip
RUN unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/local/bin
RUN rm terraform_${TERRAFORM_VERSION}_linux_amd64.zip
RUN terraform -v

### Install aws cli
RUN curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip
RUN unzip awscliv2.zip
RUN rm awscliv2.zip
RUN ./aws/install
RUN aws --version

### Install aws sam cli
RUN wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
RUN unzip aws-sam-cli-linux-x86_64.zip -d awssamcli
RUN rm aws-sam-cli-linux-x86_64.zip
RUN ./awssamcli/install
RUN sam --version