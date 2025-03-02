#!/usr/bin/env bash

# Run build
npm run build || { echo "Build failed"; exit 1; }

# Copy files to target directory
sudo cp -r dist/* /var/www/nekoha/ || { echo "Failed to copy files"; exit 1; }

# Change ownership
sudo chown -R www-data:www-data /var/www/nekoha/ || { echo "Failed to change ownership"; exit 1; }

# Set permissions
sudo chmod -R 755 /var/www/nekoha/ || { echo "Failed to set permissions"; exit 1; }

# Success message
echo "Done Deploying Page"
