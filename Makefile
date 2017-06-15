ROOT = $(shell pwd)/

.DEFAULT: help
.IGNORE: clean 

all: help

create-log-group:
	aws logs create-log-group --log-group-name cloud-analytics

stream:
	aws logs create-log-stream --log-group-name cloud-analytics --log-stream-name data-stream

# TARGET:help               Help
help:
	# Usage:
	#   make <target> [OPTION=value]
	#
	# Targets:
	@egrep "^# TARGET:" [Mm]akefile | sed 's/^# TARGET:/#   /'
