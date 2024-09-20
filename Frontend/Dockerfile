# Stage 1: Build the Angular app
FROM node:20 AS build

# Set the working directory
WORKDIR /myapp

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /myapp/dist/pro/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
