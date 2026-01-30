.PHONY: help install dev build start test lint format clean docker-build docker-run docker-stop logs

# Configuration
DOCKER_IMAGE = telegram-subscriber-api
DOCKER_TAG = latest
PORT = 3000

# Couleurs pour l'affichage
YELLOW = \033[1;33m
GREEN = \033[1;32m
RED = \033[1;31m
NC = \033[0m # No Color

help: ## Afficher cette aide
	@echo "$(GREEN)Telegram Subscriber API - Commandes disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Installer les dépendances
	@echo "$(GREEN)Installation des dépendances...$(NC)"
	npm install

dev: ## Démarrer en mode développement
	@echo "$(GREEN)Démarrage en mode développement...$(NC)"
	npm run dev

build: ## Compiler TypeScript
	@echo "$(GREEN)Compilation TypeScript...$(NC)"
	npm run build

start: build ## Démarrer en mode production
	@echo "$(GREEN)Démarrage en mode production...$(NC)"
	npm start

test: ## Lancer les tests
	@echo "$(GREEN)Lancement des tests...$(NC)"
	npm test

test-watch: ## Lancer les tests en mode watch
	@echo "$(GREEN)Tests en mode watch...$(NC)"
	npm run test:watch

lint: ## Vérifier le code avec ESLint
	@echo "$(GREEN)Vérification du code...$(NC)"
	npm run lint

lint-fix: ## Corriger automatiquement les erreurs ESLint
	@echo "$(GREEN)Correction automatique...$(NC)"
	npm run lint --fix

format: ## Formater le code avec Prettier
	@echo "$(GREEN)Formatage du code...$(NC)"
	npx prettier --write "src/**/*.ts"

clean: ## Nettoyer les fichiers générés
	@echo "$(RED)Nettoyage...$(NC)"
	rm -rf dist/
	rm -rf node_modules/
	rm -rf coverage/
	rm -rf logs/*.log

setup: ## Configuration initiale du projet
	@echo "$(GREEN)Configuration du projet...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(YELLOW)Fichier .env créé. N'oubliez pas de configurer TELEGRAM_BOT_TOKEN$(NC)"; \
	else \
		echo "$(YELLOW).env existe déjà$(NC)"; \
	fi
	$(MAKE) install

# Commandes Docker

docker-build: ## Construire l'image Docker
	@echo "$(GREEN)Construction de l'image Docker...$(NC)"
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-run: ## Lancer le container Docker
	@echo "$(GREEN)Démarrage du container...$(NC)"
	docker run -d \
		--name $(DOCKER_IMAGE) \
		-p $(PORT):3000 \
		--env-file .env \
		$(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo "$(GREEN)Container démarré sur http://localhost:$(PORT)$(NC)"

docker-stop: ## Arrêter le container Docker
	@echo "$(RED)Arrêt du container...$(NC)"
	docker stop $(DOCKER_IMAGE) || true
	docker rm $(DOCKER_IMAGE) || true

docker-logs: ## Afficher les logs du container
	docker logs -f $(DOCKER_IMAGE)

docker-compose-up: ## Démarrer avec docker-compose
	@echo "$(GREEN)Démarrage avec docker-compose...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Services démarrés$(NC)"

docker-compose-down: ## Arrêter docker-compose
	@echo "$(RED)Arrêt des services...$(NC)"
	docker-compose down

docker-compose-logs: ## Afficher les logs docker-compose
	docker-compose logs -f

# Commandes de déploiement

deploy-heroku: ## Déployer sur Heroku
	@echo "$(GREEN)Déploiement sur Heroku...$(NC)"
	git push heroku main

deploy-vercel: ## Déployer sur Vercel
	@echo "$(GREEN)Déploiement sur Vercel...$(NC)"
	vercel --prod

# Commandes utilitaires

logs: ## Afficher les logs de l'application
	@if [ -f logs/combined.log ]; then \
		tail -f logs/combined.log; \
	else \
		echo "$(RED)Aucun fichier de log trouvé$(NC)"; \
	fi

audit: ## Vérifier les vulnérabilités de sécurité
	@echo "$(GREEN)Audit de sécurité...$(NC)"
	npm audit

audit-fix: ## Corriger les vulnérabilités automatiquement
	@echo "$(GREEN)Correction des vulnérabilités...$(NC)"
	npm audit fix

update-deps: ## Mettre à jour les dépendances
	@echo "$(GREEN)Mise à jour des dépendances...$(NC)"
	npm update
	npm audit fix

check-outdated: ## Vérifier les packages obsolètes
	@echo "$(GREEN)Vérification des packages...$(NC)"
	npm outdated

docs: ## Ouvrir la documentation
	@echo "$(GREEN)Ouverture de la documentation...$(NC)"
	@if command -v xdg-open > /dev/null; then \
		xdg-open http://localhost:$(PORT)/api-docs; \
	elif command -v open > /dev/null; then \
		open http://localhost:$(PORT)/api-docs; \
	else \
		echo "$(YELLOW)Ouvrez http://localhost:$(PORT)/api-docs dans votre navigateur$(NC)"; \
	fi

health: ## Vérifier l'état de l'API
	@echo "$(GREEN)Vérification de l'état de l'API...$(NC)"
	@curl -s http://localhost:$(PORT)/health | jq . || echo "$(RED)API non accessible$(NC)"

# Commandes de développement

watch: ## Surveiller les changements et recompiler
	@echo "$(GREEN)Mode watch activé...$(NC)"
	npx tsc --watch

check: lint test ## Vérifier le code et lancer les tests

pre-commit: format lint test ## Vérifications avant commit
	@echo "$(GREEN)Prêt à commit !$(NC)"

# Commandes de release

version-patch: ## Incrémenter la version patch (1.0.0 -> 1.0.1)
	npm version patch

version-minor: ## Incrémenter la version minor (1.0.0 -> 1.1.0)
	npm version minor

version-major: ## Incrémenter la version major (1.0.0 -> 2.0.0)
	npm version major

# Info système

info: ## Afficher les informations système
	@echo "$(GREEN)Informations système:$(NC)"
	@echo "Node.js: $$(node --version)"
	@echo "npm: $$(npm --version)"
	@echo "TypeScript: $$(npx tsc --version)"
	@echo "Docker: $$(docker --version 2>/dev/null || echo 'non installé')"

