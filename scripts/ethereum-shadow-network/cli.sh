#!/bin/bash

# Define the scripts available to run
scripts=("setup" "reset" "start" "stop" "progress" "exit")

progress() {
  screen -r shadowing_session
}

# Function to display the menu
show_menu() {
  echo "Select an option:"
  for i in "${!scripts[@]}"; do
    echo "$((i+1)). ${scripts[i]}"
  done
}

# Function to execute the selected script
run_script() {
  case $1 in
    1) ./setup.sh ;;
    2) ./reset.sh ;;
    3) ./start.sh ;;
    4) ./stop.sh ;;
    5) progress ;;
    6) echo "Remember that exiting does not stop the process! To stop the process use 'stop' option."; exit 0 ;;
    *) echo "Invalid choice, please try again." ;;
  esac
}

# Main loop
while true; do
  show_menu
  read -p "Enter your choice (1-6): " choice
  run_script $choice
done
