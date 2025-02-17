#!/bin/bash
set -e

NODE_VERSION=$1

if [ -z "$NODE_VERSION" ]; then
  echo "⚠️ Error: Please provide NODE_VERSION argument."
  exit 1
fi

cd "$HOME/.nvm/versions/node/v$NODE_VERSION/lib/node_modules/@hashgraph/hedera-local"

SED_CMD="sed -i.bak -E"

check_file() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "⚠️ Error: $file not found!"
    exit 1
  fi
}

modify_config_file() {
  CONFIG_FILE="build/configuration/originalNodeConfiguration.json"
  check_file "$CONFIG_FILE"

  echo "Modifying $CONFIG_FILE..."
  $SED_CMD 's/("key": "contracts.chainId",[[:space:]]*"value": ")[0-9]+"/\111155111"/g' "$CONFIG_FILE"
  echo "✅ Updated chainId to 11155111"
}

modify_env_file() {
  ENV_FILE=".env"
  check_file "$ENV_FILE"

  echo "Modifying $ENV_FILE..."
  $SED_CMD 's|NETWORK_NODE_MEM_LIMIT=.*|NETWORK_NODE_MEM_LIMIT=16g|' "$ENV_FILE"
  $SED_CMD 's|PLATFORM_JAVA_HEAP_MAX=.*|PLATFORM_JAVA_HEAP_MAX=12g|' "$ENV_FILE"
  echo "✅ Updated memory settings"
}

update_docker_compose_images() {
  DOCKER_COMPOSE="docker-compose.yml"
  check_file "$DOCKER_COMPOSE"

  echo "Updating image references in $DOCKER_COMPOSE..."

  $SED_CMD 's|"\${HAVEGED_IMAGE_PREFIX}network-node-haveged:\${HAVEGED_IMAGE_TAG}"|us-docker.pkg.dev/swirlds-registry/local-node/network-node-haveged:0.54.0-shadowing-wip-new-changes-0.54.0-alhpa.5.x30ca434|' "$DOCKER_COMPOSE"
  $SED_CMD 's|"\${NETWORK_NODE_IMAGE_PREFIX}\${NETWORK_NODE_IMAGE_NAME}:\${NETWORK_NODE_IMAGE_TAG}"|us-docker.pkg.dev/swirlds-registry/local-node/main-network-node:0.54.0-shadowing-wip-new-changes-0.54.0-alhpa.5.x30ca434|' "$DOCKER_COMPOSE"

  echo "✅ Updated image references in $DOCKER_COMPOSE"
}

append_volume_declaration() {
  DOCKER_COMPOSE="docker-compose.yml"
  check_file "$DOCKER_COMPOSE"

  cat <<'EOF' >> "$DOCKER_COMPOSE"
  network-node-data:
    name: network-node-data
EOF
  echo "✅ Volume declaration appended to $DOCKER_COMPOSE"
}

add_volume_mapping_to_network_node() {
  DOCKER_COMPOSE="docker-compose.yml"
  check_file "$DOCKER_COMPOSE"

  echo "Updating network-node service in $DOCKER_COMPOSE..."

  awk '
    BEGIN { inService=0; mappingInserted=0; }
    /^[[:space:]]*network-node:/ { inService=1; }
    inService && /^[^[:space:]]/ && !/network-node:/ { inService=0; }
    {
      print;
      if (inService && !mappingInserted && /^[[:space:]]*volumes:/) {
        print "      - \"network-node-data:/opt/hgcapp/services-hedera/HAPIApp2.0/data/saved\"";
        mappingInserted=1;
      }
    }
  ' "$DOCKER_COMPOSE" > "${DOCKER_COMPOSE}.new"

  mv "${DOCKER_COMPOSE}.new" "$DOCKER_COMPOSE"
  echo "✅ New volume mapping added to network-node service."
}

remove_v_flag_from_docker_commands() {
  DOCKER_SERVICE_FILE="build/services/DockerService.js"
  check_file "$DOCKER_SERVICE_FILE"

  echo "Modifying $DOCKER_SERVICE_FILE..."
  $SED_CMD 's/(`docker compose down)[[:space:]]+-v/\1 --remove-orphans/' "$DOCKER_SERVICE_FILE"
  $SED_CMD 's/(shelljs_1\.default\.exec\(`docker compose down)[[:space:]]+-v/\1 --remove-orphans/' "$DOCKER_SERVICE_FILE"
  echo "✅ Removed -v flag from $DOCKER_SERVICE_FILE"

  STOP_STATE_FILE="build/state/StopState.js"
  check_file "$STOP_STATE_FILE"

  echo "Modifying $STOP_STATE_FILE..."
  $SED_CMD 's/(`docker compose down)[[:space:]]+-v/\1 --remove-orphans/' "$STOP_STATE_FILE"
  $SED_CMD 's/(shelljs_1\.default\.exec\(`docker compose down)[[:space:]]+-v/\1 --remove-orphans/' "$STOP_STATE_FILE"
  echo "✅ Removed -v flag from $STOP_STATE_FILE"
}

modify_config_file
modify_env_file
update_docker_compose_images
append_volume_declaration
add_volume_mapping_to_network_node
remove_v_flag_from_docker_commands

echo ""
echo "✅ Setup complete!"
