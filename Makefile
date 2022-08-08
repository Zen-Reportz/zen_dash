build_documentation:
	rm -rf docs/ && sphinx-apidoc -o sphinx/ zen_dash/ && cd sphinx && make html && cp -r _build/html/. ../docs && touch ../docs/.nojekyll

publish:
	sh publish.sh

run_demo:
	sh demo.sh