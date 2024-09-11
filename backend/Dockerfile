# Estágio 1: Construção
FROM node:20 AS build

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app/

# Instalação das dependências
RUN yarn cache clean && \
    rm -rf node_modules/ && \
    yarn install --frozen-lockfile

# Copia do código fonte
COPY . .

EXPOSE 4000

CMD [ "start:build", "start:prod" ]