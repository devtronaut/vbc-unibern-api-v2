all: build-docker-image help
.PHONY: all
.SILENT: all

.DEFAULT_GOAL := help

build-docker-image: # Build Docker image for the hello-world microservice
	docker build --platform linux/amd64 -t hello-world-image:test .

help: # Print help on Makefile
	@grep '^[^.#]\+:\s\+.*#' Makefile | \
	sed "s/\(.\+\):\s*\(.*\) #\s*\(.*\)/`printf "\033[93m"`\1`printf "\033[0m"`     \3 [\2]/" | \
	expand -t20