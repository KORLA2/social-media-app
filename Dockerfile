FROM node:18-alpine
WORKDIR /socialnetwork
ADD ./redux/package*.json ./
RUN  npm i --legacy-peer-deps
ADD ./redux .

EXPOSE 3000

CMD ["npm","start"]
