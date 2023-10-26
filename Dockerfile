FROM node:19

# App directory:
WORKDIR /usr/src/crumbs

# Copy all un-ignored files into workdir:
COPY . .

#RUN mkdir server
#RUN mkdir client

# Install dependencies:
#COPY ./server/package*.json ./server
#COPY ./client/package*.json ./client

WORKDIR ./server
RUN npm install

WORKDIR ../client
RUN npm install

WORKDIR ../


# Expose port 443
EXPOSE 443

# Build and start server:
CMD ["npm", "start"]


