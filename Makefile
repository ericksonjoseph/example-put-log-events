ROOT = $(shell pwd)/

.DEFAULT: help
.IGNORE: clean 

all: help

# TARGET:update             Performs a build with new code & existing deps
update: zip

# TARGET:build              Performs a clean build, installs deps etc
build: clean deps zip

zip:
	cd $(ROOT) && \
		zip -r lambda.zip src/index.js node_modules

deps:
	cd $(ROOT) \
		&& rm -r $(ROOT)node_modules; \
		npm install

clean:
	cd $(ROOT) \
		&& rm *.zip; \

# TARGET:help               Help
help:
	# Usage:
	#   make <target> [OPTION=value]
	#
	# Targets:
	@egrep "^# TARGET:" [Mm]akefile | sed 's/^# TARGET:/#   /'
