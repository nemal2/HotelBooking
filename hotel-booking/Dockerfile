FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
# Set environment variable during build
ENV REACT_APP_API_URL=http://51.21.2.214:8080
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]