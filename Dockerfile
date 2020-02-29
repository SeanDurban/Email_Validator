FROM node:10
# app dir
WORKDIR /app
# Copy over package config
COPY package.json /app
# Install dependencies
RUN npm install
# Copy the rest of the files over to the app dir
COPY . /app
# Start service
CMD ["npm", "start"]