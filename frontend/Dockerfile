# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the development port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
