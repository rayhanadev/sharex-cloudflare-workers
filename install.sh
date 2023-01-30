# Script Setup

echo "============"
echo "| Packages |"
echo "============"

echo -e "\n"

echo "Installing dependencies..."
npm install &>/dev/null  # install NPM modules
echo "Installed dependencies!"

echo -e "\n---\n"

echo "=================="
echo "| Authentication |"
echo "=================="

echo -e "\n"

if [[ -z "${CLOUDFLARE_API_TOKEN}" ]]; then
	echo "Please login to Cloudflare..."
	npx wrangler login
else
	echo "Using 'CLOUDFLARE_API_TOKEN' env variable."
fi

echo -e "\n"

echo "What is your account id? (https://t.ly/rtfD)"
read ACCOUNT_ID

touch wrangler.toml

echo account_id = "\"${ACCOUNT_ID}\"" >> wrangler.toml
echo account_id = "\"${ACCOUNT_ID}\"" >> files/wrangler.toml
echo account_id = "\"${ACCOUNT_ID}\"" >> images/wrangler.toml
echo account_id = "\"${ACCOUNT_ID}\"" >> sharex/wrangler.toml
echo account_id = "\"${ACCOUNT_ID}\"" >> text/wrangler.toml
echo account_id = "\"${ACCOUNT_ID}\"" >> urls/wrangler.toml

# Acquire Resources

echo -e "\n---\n"

echo "=================="
echo "| Resources Setup |"
echo "=================="

echo -e "\n"

echo "What is your workers.dev subdomain? (e.g. rayhanadev)"
read DOMAIN

echo -e "\n"

echo "Creating FILES_KV R2 Bucket..."
npx wrangler r2 bucket create files-kv
npx wrangler r2 bucket create files-kv-preview

echo -e "\n"

echo "Creating IMAGES_KV R2 Bucket..."
npx wrangler r2 bucket create images-kv
npx wrangler r2 bucket create images-kv-preview

echo -e "\n"

echo "Creating TEXT_KV R2 Bucket..."
npx wrangler r2 bucket create text-kv
npx wrangler r2 bucket create text-kv-preview

echo -e "\n"

echo "Creating URLS_KV R2 Bucket..."
npx wrangler r2 bucket create urls-kv
npx wrangler r2 bucket create urls-kv-preview

echo -e "\n"

echo "Creating FILES_BUCKET R2 Bucket..."
npx wrangler r2 bucket create files-bucket
npx wrangler r2 bucket create files-bucket-preview

echo -e "\n"

echo "Creating IMAGES_BUCKET R2 Bucket..."
npx wrangler r2 bucket create images-bucket
npx wrangler r2 bucket create images-bucket-preview

echo "Created all R2 Buckets!"

echo "Creating SERVER_API_KEY secret..."
SERVER_API_KEY = "$(openssl rand -hex 64)"

SERVER_API_KEY > .config/server_api_key

echo "Created 'SERVER_API_KEY'. You can find a copy of it
in .config/server_api_key. Copy the text in this file and enter
it in the next few commands. Please delete this file once you
have copied the key!"

echo -e "\n"

# Setup Workers

echo -e "\n---\n"

echo "======================="
echo "| ShareX Server Setup |"
echo "======================="

echo -e "\n"

cd sharex/

echo "Installing packages..."
npm install &>/dev/null

echo "Publishing ShareX Server worker to Cloudflare..."
npx wrangler publish

echo "Adding SERVER_API_KEY secret (you will need to copy-paste)..."
npx wrangler secret put SERVER_API_KEY

cd ../

echo "Setup ShareX Server!"

echo -e "\n---\n"

echo "==============="
echo "| Files Setup |"
echo "==============="

echo -e "\n"

cd files/

echo "Installing packages..."
npm install &>/dev/null

echo "Publishing Files Worker to Cloudflare..."
npx wrangler publish

cd ../

echo "Setup Files Worker!"

echo -e "\n---\n"

echo "================"
echo "| Images Setup |"
echo "================"

echo -e "\n"

cd images/

echo "Installing packages..."
npm install &>/dev/null

echo "Publishing Images Worker to Cloudflare..."
npx wrangler publish

cd ../

echo "Setup Images Worker!"

echo -e "\n---\n"

echo "=============="
echo "| Text Setup |"
echo "=============="

echo -e "\n"

cd text/

echo "Installing packages..."
npm install &>/dev/null

echo "Publishing Text Worker to Cloudflare..."
npx wrangler publish

cd ../

echo "Setup Text Worker!"

echo -e "\n---\n"

echo "=============="
echo "| URLs Setup |"
echo "=============="

echo -e "\n"

cd urls/

echo "Installing packages..."
npm install &>/dev/null

echo "Publishing URLs Worker to Cloudflare..."
npx wrangler publish

cd ../

echo "Setup URLs Worker!"

echo -e "\n---\n"