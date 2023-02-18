FROM node:16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /

RUN npm i -g nodemon
RUN npm install pm2 -g

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

RUN npx prisma generate

EXPOSE 7050
CMD [ "npm", "start" ]
