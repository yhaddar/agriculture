# Use Node.js as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the build files
RUN npm install -g serve

# Expose the port
EXPOSE 3000

RUN chown -R node:node /app
USER node


# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]
