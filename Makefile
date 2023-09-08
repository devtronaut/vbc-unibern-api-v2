all: tf-init-reconfigure tf-plan tf-apply tf-destroy help
.PHONY: all
.SILENT: all

.DEFAULT_GOAL := help

tf-init-local: # Initialize the working directory with the local backend
	terraform -chdir=terraform init -reconfigure

tf-init-reconfigure: # Initialize the working directory with the remote backend
	terraform -chdir=terraform init -backend-config=./backend/backend.hcl -reconfigure

tf-plan: # Create an execution plan with the changes specified in the terraform scripts
	terraform -chdir=terraform plan \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars

tf-apply: # Apply the changes specified in the terraform scripts
	terraform -chdir=terraform apply \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars

tf-destroy: # Destroy resources created with the terraform scripts
	terraform -chdir=terraform destroy \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars		

tf-deploy-service: check-service-name # Deploy service specified by a SERVICE env variable
	@cd ./services/${SERVICE} && npm run compile
	@make tf-apply

check-service-name:
ifndef SERVICE
	$(error SERVICE is not set)
else
	$(info SERVICE is set to ${SERVICE})
endif

help: # Print help on Makefile
	@grep '^[^.#]\+:\s\+.*#' Makefile | \
	sed "s/\(.\+\):\s*\(.*\) #\s*\(.*\)/`printf "\033[93m"`\1`printf "\033[0m"`     \3 [\2]/" | \
	expand -t20