# Use Node.js for build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app files & build
COPY . .
RUN npm run build

# Use Nginx to serve React app
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80
