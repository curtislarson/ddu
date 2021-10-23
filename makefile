test:
	deno fmt --check
	deno lint
	deno test --allow-read

.PHONY: test