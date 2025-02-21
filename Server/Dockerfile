# Use a minimal Node.js image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies (including devDependencies )
RUN npm ci

# Copy the source code ()
COPY . .





# Start the application
CMD ["node", "index.js"]