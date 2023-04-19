# Step 1 - setup our container
FROM node:18-alpine as dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

# This is needed to run the app in an alpine container
RUN npm install -D --force @swc/core-linux-musl

COPY --chown=node:node ./ ./

RUN npm run build

USER node
# Step 2- Copy only the files from 'dev' that we need for prod and start the server
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node --from=dev /usr/src/app/package*.json ./

COPY --chown=node:node --from=dev /usr/src/app/.next ./.next

RUN npm install --production

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]
