SHELL := /bin/bash
.DEFAULT_GOAL := help

CONTAINER_PREFIX=ms-jeu-odyssee-teams
DC=docker-compose -p ${CONTAINER_PREFIX}



setup: pull build up ## Setup the development environment

pull: ## Pull the external images
	${DC} pull

build: ## Build the containers and pull FROM statements
	${DC} build

rebuild: ## Rebuild containers
	${MAKE} down build up

up: ## Up the containers
	${DC} up -d

down: ## Down the containers (keep volumes)
	${DC} down

destroy: ## Destroy the containers, volumes, networks…
	${DC} down -v --remove-orphan

start: ## Start the containers
	${DC} start

stop: ## Stop the containers
	${DC} stop

restart: ## Restart the containers
	${MAKE} down up

bash: ARGS = front
bash: ## Run bash shell
	${DC} exec ${ARGS} bash

.PHONY: logs
logs: ## Show containers logs
	${DC} logs -f --tail="100"

dc: ARGS = ps
dc: ## Run docker-compose command. Use ARGS="" to pass parameters to docker-compose.
	${DC} ${ARGS}

### OTHERS
# ¯¯¯¯¯¯¯¯

.PHONY: help
help: ## Display this help
	@IFS=$$'\n'; for line in `grep -E '^[a-zA-Z_#-]+:?.*?## .*$$' $(MAKEFILE_LIST)`; do if [ "$${line:0:2}" = "##" ]; then \
	echo $$line | awk 'BEGIN {FS = "## "}; {printf "\n\033[33m%s\033[0m\n", $$2}'; else \
	echo $$line | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'; fi; \
	done; unset IFS;