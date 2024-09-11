# Estágio 1: Construção
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build


# Estágio 2: Produção
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN apk add --no-cache tzdata
COPY --from=build /app/dist .
EXPOSE 3003