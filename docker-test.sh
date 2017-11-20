#!/bin/bash

n=0
# Retry several times until the app has started
until [ $n -ge 10 ]
do
    nc -zv localhost 3000
    if [ $? -eq 0 ]
    then
        echo "Successfully accessed Yangster inside Docker"
        break
    fi
    n=$[$n+1]
    sleep 1
done