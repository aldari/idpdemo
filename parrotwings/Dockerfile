FROM node:16.17.0-alpine3.16 as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

FROM nginx as runtime
COPY ["nginx.conf", "/etc/nginx/nginx.conf"]
COPY --from=build /app/dist/parrotwings /usr/share/nginx/html