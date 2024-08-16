FROM node:current-alpine

COPY package.json package.json  
RUN pnpm install

# Add your source files
COPY . .  
RUN pnpm build
CMD ["pnpm","start"]  
