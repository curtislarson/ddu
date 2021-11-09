clean:
	deno fmt
	deno lint

test:
	deno test --allow-read

.PHONY: clean test