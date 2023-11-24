FROM node:18.17.0-alpine AS base
# installing pnpm package manager
RUN npm i -g pnpm

# dev
FROM base AS dev
ARG APP
ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./ 
RUN pnpm install

COPY . .

RUN pnpm run build ${APP}

# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/src/main 
# prod
CMD node ${APP_MAIN_FILE}




