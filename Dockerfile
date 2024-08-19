FROM node:current AS base
WORKDIR /app

COPY package.json package.json
RUN npm install
COPY . .

FROM base AS dev
EXPOSE 3000
ENTRYPOINT ["/bin/sh"]

FROM base AS build
RUN npm run build

FROM build AS prod
RUN npm run build

ENTRYPOINT ["npm","run","start"]