
read -p "Are you sure you want to reset the network? (y/n): " choice
if [ "$choice" != "y" ]; then
  echo "Exiting..."
  exit 0
fi

echo "Resetting data..."
./stop.sh

rm -r hedera-ethereum-shadowing/logs > /dev/null 2>&1
rm -r hedera-shadowing-smart-contract-comparsion/logs > /dev/null 2>&1
rm -r transaction-checker/logs > /dev/null 2>&1

echo "Remember to delete docker containers, images, and volumes manually."
echo "Done."