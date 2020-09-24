#!/usr/bin/env bash

t=$(mktemp)
echo "Getting logs from container $1 and saving to $t"
docker logs $1 > $t
node analyze_times.js $t
rm $t
