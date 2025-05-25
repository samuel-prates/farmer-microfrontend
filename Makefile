install:
	npm install

start-dev:
	npm run dev

jest:
	npm run test

lint:
	npm run lint

lint-fix:
	npm run lint:fix

build:
	npm run build

docker-up:
	docker-compose up -d 

docker-down:
	docker-compose down -v

docker-restart:
	npm run build
	docker-compose down -v
	docker-compose up -d

docker-log:
	docker-compose logs -f

docker-erase:
	docker-compose down -v
	docker rmi frontend-farms-frontend