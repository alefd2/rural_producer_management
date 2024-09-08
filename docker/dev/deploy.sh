#!/bin/bash

echo "

 ##   ##   #####   ######   #######   #####            #####    #######  ######   ####      #####   ##  ##
 ##   ##  ##   ##  # ## #    ##   #  ##   ##            ## ##    ##   #   ##  ##   ##      ##   ##  ##  ##
  ## ##   ##   ##    ##      ## #    #                  ##  ##   ## #     ##  ##   ##      ##   ##  ##  ##
  ## ##   ##   ##    ##      ####     #####             ##  ##   ####     #####    ##      ##   ##   ####
   ###    ##   ##    ##      ## #         ##            ##  ##   ## #     ##       ##   #  ##   ##    ##
   ###    ##   ##    ##      ##   #  ##   ##            ## ##    ##   #   ##       ##  ##  ##   ##    ##
    #      #####    ####    #######   #####            #####    #######  ####     #######   #####    ####

"

echo ""
echo ""
echo "==================================="
echo "=========  BUILD BACKEND =========="
echo "==================================="
echo ""
echo ""

sudo docker compose build rural-farm-api

echo ""
echo ""
echo "==================================="
echo "=========  BUILD FRONTEND ========="
echo "==================================="
echo ""
echo ""

sudo docker compose build rural-farm-front-nginx

echo ""
echo ""
echo ""

echo "========= BUILD FINALIZADO =========="

echo ""
echo ""
echo "==================================="
echo "==== REMOVENDO PASTA DIST ========"
echo "==================================="
echo ""
echo ""

cd ../../web/ && sudo rm -rf dist

echo "========= PASTA DIST REMOVIDA ! ========="

echo ""
echo ""
echo "==================================="
echo "==== EXECUTANDO yarn build:dev ========"
echo "==================================="
echo ""
echo ""

yarn --cwd ../../web/ build:dev

echo ""
echo ""
echo "==================================="
echo "====== REINICIANDO SERVIDOR ======="
echo "==================================="
echo ""
echo ""

cd ../docker/dev/ 

sudo docker compose down

sudo docker compose up -d

echo "========= SERVIDOR REINICIADO =========="

echo ""
echo ""
echo "==================================="
echo "==== LIMPAR IMAGENS SEM TAGS ======"
echo "==================================="
echo ""
echo ""

sudo docker images -q -f "dangling=true" | sudo xargs --no-run-if-empty docker rmi -f

echo "========= FINALIZADO ! ========="