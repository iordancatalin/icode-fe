FROM node:14.8.0 as buildStage

WORKDIR /app
COPY ./public ./public
COPY ./src ./src
COPY ./package-lock.json .
COPY ./package.json .

RUN npm i && npm run build

FROM nginx:1.19.6

COPY --from=buildStage /app/build /usr/share/nginx/html
EXPOSE 80