FROM node:19

# App directory:
WORKDIR /usr/src/crumbs

# Install dependencies:
COPY package*.json ./

RUN npm install

# Copy all un-ignored files into workdir:
COPY . .

# Expose port 8080
EXPOSE 443

# Build and start server:
CMD ["npm", "start"]


