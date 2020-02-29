FROM node:12-slim
# app dir
WORKDIR /app
# Copy over package config
COPY package.json /app
# Install dependencies
RUN npm install
# Copy the rest of the files over to the app dir
COPY . /app
# Explicity about ports
EXPOSE 8080
EXPOSE 3000
# Start service
CMD ["npm", "start"]