# # Step 1: Build the Angular app
# FROM node:18 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the Angular application for production
# RUN npm run build --prod

# # Step 2: Serve the Angular app using Nginx
# FROM nginx:alpine

# # Copy the build files from the previous stage into Nginx's default directory
# COPY --from=build /app/dist/emp-dashboard /usr/share/nginx/html

# # Expose the port Nginx is running on
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]


# Use a lightweight web server image
FROM nginx:alpine

# Copy the built Angular application from your local machine
COPY ./dist/emp-dashboard /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
