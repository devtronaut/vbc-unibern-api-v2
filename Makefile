all: tf-init-reconfigure tf-plan tf-apply tf-destroy help
.PHONY: all
.SILENT: all

.DEFAULT_GOAL := help

aws-configure-context: check-aws-env # Configure the aws context
	aws configure --profile ${AWS_DEFAULT_PROFILE}

tf-init-local: # Initialize the working directory with the local backend
	terraform -chdir=terraform init -reconfigure

tf-init-reconfigure: # Initialize the working directory with the remote backend
	terraform -chdir=terraform init -backend-config=./backend/backend.hcl -reconfigure

tf-plan: # Create an execution plan with the changes specified in the terraform scripts
	terraform -chdir=terraform plan \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars	\
		-var-file=./variables/gateway.tfvars

tf-apply: # Apply the changes specified in the terraform scripts
	terraform -chdir=terraform apply -auto-approve \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars	\
		-var-file=./variables/gateway.tfvars

tf-destroy: # Destroy resources created with the terraform scripts
	terraform -chdir=terraform destroy \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars \
		-var-file=./variables/gateway.tfvars

tf-deploy-service: check-service-name # Deploy service specified by a SERVICE env variable
	@cd ./services/${SERVICE} && npm run build
	@make tf-apply

build-service: check-service-name # Build service specified by a SERVICE env variable
	@cd ./services/${SERVICE} && npm run build

build-all-services: # Build all services
	@cd ./services/games-service && npm i && npm run build
	@cd ./services/loader-service && npm i && npm run build
	@cd ./services/rankings-service && npm i && npm run build
	@cd ./services/results-service && npm i && npm run build

check-service-name:
ifndef SERVICE
	$(error SERVICE is not set)
else
	$(info SERVICE is set to ${SERVICE})
endif

check-aws-env:
ifndef AWS_DEFAULT_PROFILE
	$(error AWS_DEFAULT_PROFILE is not set)
endif

format-check:
	npx prettier . --check

format-write:
	npx prettier . --write

lint:
	npx eslint .

help: # Print help on Makefile
	@grep '^[^.#]\+:\s\+.*#' Makefile | \
	sed "s/\(.\+\):\s*\(.*\) #\s*\(.*\)/`printf "\033[93m"`\1`printf "\033[0m"`     \3 [\2]/" | \
	expand -t20