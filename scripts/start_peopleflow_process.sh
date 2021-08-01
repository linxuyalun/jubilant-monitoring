#!/bin/bash
# param 1: Password of the node

PID=$(ps -ef | grep PeopleFlow | grep -v grep | awk '{print $2}' | sed -n '1p')

# check pid is emprty or not
if [ -n "${PID}" ]
then
  echo "service existed before"
  kill -9 ${PID}
fi

cd /home/ubuntu/workspace/JHPeopleFlow/
nohup ./PeopleFlow 2>/dev/null &
