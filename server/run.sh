#!/bin/bash
while true; do
    echo "Starting Server...."
    node server.cjs
    echo "Server crashed. Restarting..."
    sleep 1
done
