PROJECT_NAME ?= today-i-learned
ENV ?= stable

AWS_BUCKET_NAME ?= $(PROJECT_NAME)-artifacts-$(ENV)
AWS_STACK_NAME ?= $(PROJECT_NAME)-stack-$(ENV)
AWS_REGION ?= us-west-2

FILE_TEMPLATE = template.yml
FILE_PACKAGE = package.yml
FILE_SCHEMA = ../frontend/graphql/schema.graphql

SCHEMA := $(shell cat $(FILE_SCHEMA))
EXPIRATION = $(shell echo $$(( $(shell date +%s) + 604800 ))) # 7 days from now (timestamp)

default: package deploy

configure:
	@ aws s3api create-bucket \
		--bucket $(AWS_BUCKET_NAME) \
		--region $(AWS_REGION) \
		--create-bucket-configuration LocationConstraint=$(AWS_REGION)

upload-graphql: 
	@ aws s3 cp $(FILE_SCHEMA) s3://$(AWS_BUCKET_NAME)/schema.graphql

package: upload-graphql
	@ aws cloudformation package \
		--template-file $(FILE_TEMPLATE) \
		--s3-bucket $(AWS_BUCKET_NAME) \
		--region $(AWS_REGION) \
		--output-template-file $(FILE_PACKAGE)

deploy: package
	@ aws cloudformation deploy \
		--template-file $(FILE_PACKAGE) \
		--region $(AWS_REGION) \
		--capabilities CAPABILITY_IAM \
		--stack-name $(AWS_STACK_NAME) \
		--force-upload \
		--parameter-overrides \
			ParamProjectName=$(PROJECT_NAME) \
			ParamBucketName=$(AWS_BUCKET_NAME) \
			ParamKeyExpiration=$(EXPIRATION) \
			ParamENV=$(ENV)

undeploy:
	@ aws cloudformation delete-stack \
		--stack-name $(AWS_STACK_NAME)

describe:
	@ aws cloudformation describe-stacks \
		--region $(AWS_REGION) \
		--stack-name $(AWS_STACK_NAME)

errors:
	@ aws cloudformation describe-stack-events \
		--region $(AWS_REGION) \
		--stack-name $(AWS_STACK_NAME) \
		| jq '.StackEvents[] | select(.ResourceStatus | contains("FAILED"))'

outputs:
	@ make describe \
		| jq -r '.Stacks[0].Outputs'

.PHONY: default clean configure package deploy describe output
