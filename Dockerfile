# Use the official Node.js image as the base image
FROM node:18.20.4-slim

# Create and change to the app directory
WORKDIR /root/webss

# Install dependencies required for Puppeteer
RUN apt-get update && apt-get install -y \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2 \
    libxshmfence1 \
    libnss3 \
    libxss1 \
    libxtst6 \
    libgtk-3-0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#Build tailwind css
RUN npx tailwindcss -i ./src/styles/tailwind.css -o ./src/public/css/tailwind.css --minify

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
