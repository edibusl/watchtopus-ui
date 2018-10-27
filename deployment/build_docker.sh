#!/usr/bin/env bash

##########################
# Build watchtopus-server
##########################

# Delete files that were copied to docker dir on previous builds (if any)
rm -rf watchtopus-ui/src_files

# Copy source files to docker
mkdir watchtopus-ui/src_files
cp -r ../public watchtopus-ui/src_files/
cp -r ../src watchtopus-ui/src_files/
cp -r ../package.json watchtopus-ui/src_files/
cp -r ../package-lock.json watchtopus-ui/src_files/

# Build
sudo docker build -t watchtopus-ui watchtopus-ui/


##########################################
# Push dockers to docker registry
##########################################

# Set AWS profile to "edi" in order use that profile credentials to push to AWS account
# Prior configuration should be done by editing the ~/.aws/credentials file as explained in the link below
# https://stackoverflow.com/questions/44243368/how-to-login-with-aws-cli-using-credentials-profiles
export AWS_PROFILE=edi

# Login to AWS ECS docker registry
OUTPUT="$(aws ecr get-login --no-include-email --region eu-central-1)"
cmd="sudo $OUTPUT"
eval $cmd

# Tag our docker local images that we've just build with "latest" tag
sudo docker tag watchtopus-ui:latest 312452674585.dkr.ecr.eu-central-1.amazonaws.com/watchtopus-ui:latest

# Push image to docker registry
sudo docker push 312452674585.dkr.ecr.eu-central-1.amazonaws.com/watchtopus-ui:latest