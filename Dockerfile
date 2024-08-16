FROM node:current-alpine

COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  
RUN npm build
CMD ["npm","start"]  
