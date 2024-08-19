FROM node:current-alpine AS base
WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .

FROM base AS dev
EXPOSE 3000
CMD ["npm","run","dev"]

FROM base AS build
RUN npm run build

FROM build AS prod
CMD ["npm","run","start"]