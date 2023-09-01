FROM node:18-alpine

ARG port
ARG creds
ARG postgres
ARG session
ARG api
ARG s3config

ENV PORT=$port
ENV OAuth2Creds=$creds
ENV POSTGRES=$postgres
ENV SESSION=$session
ENV API=$api
ENV S3CONFIG=$s3config
ENV NODE_ENV=production

WORKDIR /usr/qsystem/backend

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
RUN npm install

COPY ./backend .
RUN npm run build

WORKDIR /usr/qsystem/frontend

COPY ./frontend/package*.json .
COPY ./frontend/tsconfig.json .
RUN npm install

COPY ./frontend .
RUN npm run build

WORKDIR /usr/qsystem
CMD ["node", "./backend/dist/server.js"]

EXPOSE $port
