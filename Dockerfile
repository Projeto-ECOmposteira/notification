FROM node:15.14.0-alpine3.11

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8003
CMD [ "npm", "start" ]