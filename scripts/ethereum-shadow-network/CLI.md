# Ethereum Shadow Network CLI
This is a simple CLI in bash designed to help developers.

## Prerequisites

- Docker
- Node.js (Preffered: 22.12.0 - 22.13.0)

## Installation

Run `npm install` in every app in this folder:

```sh
npm install
```

## Usage

Make sure that `cli.sh` is an executable:

```sh
chmod +x cli.sh
```

Then, you can use the CLI by running:

```sh
./cli.sh
```

### Options
1. Setup: installs and configures the necessary components for the Hedera Local environment. 
    > ❗️ the local node and any modifications to it are done in currently used Node version. 

1. Reset: stops all running services, deletes log files, and re-runs the setup process to reset the network. 
    > ❗️ Additionally You must manually delete docker containers, images and volumes.

1. Start: starts all necessary services for the Hedera Local environment and saves their process IDs.

1. Stop: which stops all running services using their process IDs and removes the PID file.

1. Progress: reattaches to the screen session named `shadowing_session` to show the progress of the running services. 
    > 💡 To exit the screen session, press Ctrl+A followed by D.

1. Exit: exits the CLI menu. 
    > 💡 Exiting the menu does not stop the running services. To stop the services, use the Stop option.