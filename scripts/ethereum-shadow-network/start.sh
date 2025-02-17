#!/bin/bash

stop_services() {
    echo "Stopping all services..."
    kill $API_PID $DEV1_PID $DEV2_PID
    hedera stop
    echo "All services have been stopped."
}

trap stop_services SIGINT

# Start services in the background and save their PIDs
RELAY_CHAIN_ID=11155111 hedera start

cd hedera-shadowing-smart-contract-comparsion 
npm run api --silent & 
API_PID=$!
npm run dev --silent & 
DEV1_PID=$!

cd ../transaction-checker 
npm run dev --silent & 
DEV2_PID=$!

echo "All services have been started successfully."
echo "API PID: $API_PID, Dev1 PID: $DEV1_PID, Dev2 PID: $DEV2_PID"

wait