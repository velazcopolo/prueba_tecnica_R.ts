# Variables
SRC_DIR = src
DIST_DIR = dist
ENTRY_POINT = src/index.js

# Comandos
install:
	npm install

dev:
	npx nodemon src/index.ts

start: build
	node $(ENTRY_POINT)

build:
	npx tsc

clean:
	rm -rf $(DIST_DIR)

.PHONY: install dev start build clean
