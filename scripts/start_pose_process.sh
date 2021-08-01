#!/bin/bash

PID=$(ps -ef | grep sdemorr.py | grep -v grep | awk '{print $2}' | sed -n '1p')

# check pid is emprty or not
if [ -n "${PID}" ]
then
  echo "service existed before"
  kill -9 ${PID}
fi

cd /home/ubuntu/workspace/tf-pose-estimation-master
nohup python3 ./sdemorr.py 2>/dev/null &