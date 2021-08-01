#!/bin/bash
# param 1: Password of the node

PID=$(ps -ef | grep PeopleFlow | grep -v grep | awk '{print $2}' | sed -n '1p')

# check pid is emprty or not
if [ -z "${PID}" ]
then
  echo "service not exist"
  exit 0
fi

kill -9 ${PID}