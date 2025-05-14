#!/usr/bin/env bash

# Run build
npm run build || { echo "Build failed"; exit 1; }

# Copy files to target directory
sudo cp -r dist/* /var/www/nekoha/ || { echo "Failed to copy files"; exit 1; }

# Change ownership
sudo chown -R www-data:www-data /var/www/nekoha/ || { echo "Failed to change ownership"; exit 1; }

# Set permissions
sudo chmod -R 755 /var/www/nekoha/ || { echo "Failed to set permissions"; exit 1; }

# .env
set -a
source .env
set +a

response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_NEKOHA_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything": true }')

if echo "$response" | grep -q '"success": true'; then
    echo "Cloudflare cache purged"
    echo "Done Deploying Page"
else
    echo "Failed to purge Cloudflare cache"
    echo "$response"
    exit 1
fi
