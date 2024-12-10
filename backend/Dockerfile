# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the development port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]
