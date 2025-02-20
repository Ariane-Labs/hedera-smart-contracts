#!/bin/bash

PID_FILE="./service_pids"

stop_services() {
    echo "Stopping all services..."
    while read -r pid; do
        if kill "$pid" 2>/dev/null; then
            echo "Stopped process with PID $pid"
        else
            echo "Failed to stop process with PID $pid (may not be running)"
        fi
    done < "$PID_FILE"
    rm "$PID_FILE"
    echo "All services have been stopped."
}

if [ -f "$PID_FILE" ]; then
    screen -XS shadowing_session quit
    hedera stop
    stop_services
else
    echo "No PID file found. Services may not be running."
fi
