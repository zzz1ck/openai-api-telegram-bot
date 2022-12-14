FROM node:16.14.0
WORKDIR  /usr/src/bot
COPY . .
RUN npm ci
CMD ["npm", "run", "start"]