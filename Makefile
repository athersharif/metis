start:
	@npm start

test:
	@npm run test:watch

build:
	@make ready
	@npm run prepublish

ready:
	@make prettier
	@make lint
	@make docs

prettier:
	@npm run prettier

lint:
	@npm run lint

docs:
	@npm run docs

.PHONY: start ready build test prettier lint docs
