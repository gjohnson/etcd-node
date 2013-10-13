REPORTER = spec
TESTS ?= $(wildcard test/*.test.js)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) \
		--require "should" \
		--timeout 2000 \
		--reporter $(REPORTER) \
		--growl \

test-cov: lib-cov
	@ETCD_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

clean:
	@rm -rf lib-cov coverage.html

.PHONY: test lib-cov test-cov clean