FROM node:19

# App directory:
WORKDIR /usr/src/crumbs

# Install dependencies:
COPY /server/package*.json ./server
COPY /client/package*.json ./client

WORKDIR ./server
RUN npm install

WORKDIR ../client
RUN npm install

WORKDIR ../

# Copy all un-ignored files into workdir:
COPY . .

# Expose port 8080
EXPOSE 443

# Build and start server:
CMD ["npm", "start"]


