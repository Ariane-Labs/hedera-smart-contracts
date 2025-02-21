#!/bin/bash

PID_FILE="./service_pids"

if [ -f "$PID_FILE" ]; then
    echo "PID file exists. Services may already be running. Exiting..."
    exit 1
fi

# Start services in the background and save their PIDs
RELAY_CHAIN_ID=11155111 hedera start || exit 1

# Create PID file
touch "$PID_FILE"

cd hedera-shadowing-smart-contract-comparsion || exit 1
npm run api --silent > /dev/null 2>&1 &
API_PID=$!

npm run dev --silent > /dev/null 2>&1 &
DEV1_PID=$!

cd ../transaction-checker || exit 1
npm run dev --silent > /dev/null 2>&1 &
DEV2_PID=$!
cd ..

cd hedera-ethereum-shadowing || exit 1
screen -dmS shadowing_session npm run dev
MAIN_PID=$!

cd ..

echo $API_PID >> "$PID_FILE"
echo $DEV1_PID >> "$PID_FILE"
echo $DEV2_PID >> "$PID_FILE"
echo $MAIN_PID >> "$PID_FILE"

echo "All services have been started successfully."
echo " Comparison API PID: $API_PID, Comparison PID: $DEV1_PID, TX checker PID: $DEV2_PID, shadowing PID $MAIN_PID"
