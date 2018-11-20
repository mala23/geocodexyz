#!/bin/bash
while IFS='' read -r line || [[ -n "$line" ]]; do
      echo $line,`curl -X POST -d locate="$line" -d geoit="csv" https://geocode.xyz`;
    done < "$1"
