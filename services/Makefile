all: tf-init-reconfigure tf-plan tf-apply tf-destroy help
.PHONY: all
.SILENT: all

.DEFAULT_GOAL := help

tf-init-reconfigure: # Initialize the working directory with the desired backend
	terraform -chdir=terraform init -backend-config=./backend/backend.hcl -reconfigure

tf-plan: # Create an execution plan with the changes specified in the terraform scripts
	terraform -chdir=terraform plan -lock=false \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars

tf-apply: # Apply the changes specified in the terraform scripts
	terraform -chdir=terraform apply -lock=false \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars

tf-destroy: # Destroy resources created with the terraform scripts
	terraform -chdir=terraform destroy \
		-var-file=./variables/backend.tfvars \
		-var-file=./variables/services.tfvars		

help: # Print help on Makefile
	@grep '^[^.#]\+:\s\+.*#' Makefile | \
	sed "s/\(.\+\):\s*\(.*\) #\s*\(.*\)/`printf "\033[93m"`\1`printf "\033[0m"`     \3 [\2]/" | \
	expand -t20