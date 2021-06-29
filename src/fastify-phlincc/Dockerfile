FROM node:latest

# Create app directory
RUN mkdir -p /root/fastify
WORKDIR /root/fastify

# Install app dependencies
COPY package.json /root/fastify
RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . /root/fastify