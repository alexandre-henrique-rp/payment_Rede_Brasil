#!/bin/bash

# Passo 1: Capturar o parâmetro passado e salvar na variável nome_route
nome_route=$1

# Passo 2: Sair de dentro de 2 pastas
cd "$(dirname "$0")/../../" || exit

# Passo 3: Entrar na pasta src
cd src || exit

# Captura o diretório atual onde o script está sendo executado
caminho_atual=$(pwd)

# Captura o caminho onde o diretório do route está sendo criado
caminho_route="$caminho_atual/src/route/${nome_route}Route"

# Passo 4: Editar o arquivo server.ts
# Adicionar uma linha de import
sed -i "/^import.*'\/route\/${nome_route}Route';/d" server.ts # Remove a linha se já existir
sed -i "1i\\
import ${nome_route^}Router from './route/${nome_route}Route';" server.ts

# Encontrar a linha contendo "app.use(cors());"
linha_app_use=$(grep -n "app.use(cors());" server.ts | cut -d ":" -f 1)

# Adicionar a linha abaixo da linha contendo "app.use(cors());"
sed -i "${linha_app_use}a\\
app.use('/${nome_route}', ${nome_route^}Router);" server.ts

# Retorna o caminho onde o diretório do controller foi criado
echo "$caminho_route"

