up:
	@docker compose up
build:
	@docker compose build
down:
	@docker compose down -v

shell-into-app:
	@docker compose exec app bash