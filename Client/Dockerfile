# Step 1: Build Stage
FROM node:20 AS build

# Set the working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app using Vite (this will generate the build output)
RUN npm run build

# Step 2: Production Stage (final image)
FROM node:20

# Set the working directory for the production container
WORKDIR /app

EXPOSE 3000

# Copy only the necessary files (dist folder and node_modules) from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Set the command to serve the preview using Vite (for production)
CMD ["serve", "-s", "dist"]
