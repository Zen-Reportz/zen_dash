build_documentation:
	rm -rf docs/ && sphinx-apidoc -o sphinx/ zen_dash/ && cd sphinx && make html && cp -r _build/html/. ../docs && touch ../docs/.nojekyll

publish:
	sh publish.sh

push: build_documentation publish
	git add . && git commit -m "updated document document" && git push

run_demo:
	cd demo && sh demo.sh