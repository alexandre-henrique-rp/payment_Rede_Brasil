#!/bin/bash

# Passo 1: Capturar o parâmetro passado e salvar na variável nome_route
nome_route=$1

# Passo 2: Sair de dentro de 2 pastas
cd "$(dirname "$0")/../../" || exit

# Passo 3: Entrar na pasta src/route
cd src/route || exit

# Captura o diretório atual onde o script está sendo executado
caminho_atual=$(pwd)

# Captura o caminho onde o diretório do route está sendo criado
caminho_route="$caminho_atual/src/route/${nome_route}Route"

# Passo 4: Criar uma pasta com o nome fornecido + "Route"
mkdir "${nome_route}Route"

# Passo 5: Criar o arquivo index.ts com o conteúdo especificado
cat <<EOF > "${nome_route}Route/index.ts"
import express from 'express';
import ${nome_route}Controller from '../../controller/${nome_route}Controller';

const ${nome_route^}Router = express.Router();

${nome_route^}Router.get('/', ${nome_route}Controller.${nome_route^}GET);
${nome_route^}Router.get('/:id', ${nome_route}Controller.${nome_route^}GETdyId);
${nome_route^}Router.post('/', ${nome_route}Controller.${nome_route^}POST);
${nome_route^}Router.put('/update/:id', ${nome_route}Controller.${nome_route^}PUT);
${nome_route^}Router.delete('/delete/:id', ${nome_route}Controller.${nome_route^}DELETE);

export default ${nome_route^}Router;
EOF

# Retorna o caminho onde o diretório do controller foi criado
echo "$caminho_route"
