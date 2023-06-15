FROM node:18-alpine
WORKDIR /Socialnetwork
ADD package*.json ./
RUN  npm i --legacy-peer-deps
ADD . .

EXPOSE 3000

CMD ["npm","start"]
