# TESTE: GERENCIADOR RURAL

Projeto desenvolvido para fins de teste.

> ⚠️ **A VERSÃO DO NODE DEVE ESTAR ENTRE: `^18.13.0 || >=20.9.0`** ⚠️

> O script vai tentar usar o **nvm** para upar a versão para a versão 20 do node.

## O projeto buildado

[https://rural-producer-management.vercel.app/](https://rural-producer-management.vercel.app/)



## Deploy

Passos para rodar este projeto

| User              | Senha       |
| ----------------- | ----------- |
| Admin             | admin123    |

#### **OPÇAO DOCKER**

---

É necessário ter instalado o docker na sua máquina.

**| OBS: Este docker vai subir 3 containers, um banco postgress v14, um nginx e um Node.**

1.  Ir até a pasta `docker`
2.  abrir o terminal do computador na pasta `/docker/dev`
3.  rodar o comando `sh deploy.sh` **este comando irá rodar todo o ambiente**
4.  Ele ira solicitar acesso `sudo`
5.  Apos finalizar, ir para o link [http://localhost:3003/login](http://localhost:3003/login)

        ⚠️ 1. Caso a página esteja aparecendo "forbiden" ou "500 internal server error" na tela acima, verifique se a pasta web/dist esteja preenchida com os arquivos buildados. Caso não, rode novamente o "yarn build:dev".

        ⚠️ 2. Caso a pasta /dist/ esteja vazia e esteja com **a permissão negada**, rode "sudo rm -r dist" (linux - terminal unix), para excluir a pasta e rode o comando "yarn build:dev" para gerar novamente a pasta dist e rodar novamente o **passo 3**

#### **OPÇAO MANUAL INDIVIDUAL** ⭐(recomendada)

---

1. Ir na pasta backend e rodar o comando `sudo docker compose up -d` para subir o banco de dados
2. No mesmo terminal, deve rodar o comando abaixo (O comando irá instalar as dependencias do projeto e também rodará o projeto com as migrations do prisma)
   - O seu node deve ser ^18.13.0. Recomendo usar o **node 20**

```bash
  yarn build
```

3. Volta uma paste e va na pasta /web. No terminal, rode o seguinte comando

- Ele vai instalar as dependencias do projeto.

```bash
  yarn
```

- Ele rodar o projeto me modo de desenvolvimento.

```bash
  yarn start
```

1. Ir para o navegador e entrar em [http://localhost:3003/login](http://localhost:3003/login)

## Stack utilizada

⛔ Toda Stack utilizada foi pensada em usar ao máximo o que o framework já disponibilizava.


**Back-end:**

- Node
- NestJS
- yup (lib para validar props)
- Prisma como CRM
- Postgree

**Front-end:**

- ReactJs
- MaterialUI
- Phosphor (Lib de icones)
- date-fns (Tratamento de datas)
- Axios
- Immer


## Implementações

    - Usei um algorítimo para validar se o CPF/CNPJ é válido ou não. Nos testes é necessário usar um CPF válido. Usar site 4devs.com
    - Não foi usado email no login do usuário para ser mais ágil.
    - Todas as solicitações foram cumpridas com exeção de "Colocar testes em pelo menos um componente".
    - A arquitetura no Backend foi modularizada, assim como o NestJs recomenta.

    - No frontend foi usado o modelo mais padrão na web que é de componentes.
      -  📂 Pages  📂models  📂services  📂components e etc. Todas no mesmo nível.
         -  destaco que dentro dos componentes o natural é manter os comp de comum uso. Mas dentro da proposta, não consegui componentizar ou abtrair os componentes preferindo assim criar um novo quando necessário. Reitaro que a arquitetura mais próxima que utilizei foi o MVC(MODEL, VIEW e CONTROLLER).


