REPORTER = spec

test-boot:
		@./node_modules/.bin/mocha \
			--reporter $(REPORTER) \
			--ui boot \
			tests/*.js

test-all: test-boot

.PHONY: test-all