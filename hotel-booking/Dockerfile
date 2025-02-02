# Dockerfile for React Frontend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose port 3000 for the frontend
EXPOSE 5173

# Start the application
CMD ["serve", "-s", "dist"]
