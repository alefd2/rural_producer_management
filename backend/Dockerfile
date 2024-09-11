# Estágio 1: Construção
FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./

# Instalação das dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código fonte
COPY . .

# Executa o build da aplicação
RUN yarn build

# Estágio 2: Produção
FROM node:20 AS production

WORKDIR /app

# Copia apenas os arquivos necessários da imagem de build
COPY --from=build /app/dist /app/dist
COPY package.json yarn.lock ./

# Instala apenas as dependências de produção
RUN yarn install --frozen-lockfile --production

EXPOSE 4000

CMD ["yarn", "start:prod"]
