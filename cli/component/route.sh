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

/** 
 * @description Retorna uma lista de ${nome_route^}s
 * @path /
 * @method GET
 * @returns {Promise<any>} - {}
*/
${nome_route^}Router.get('/', ${nome_route}Controller.${nome_route^}GET);

/** 
 * @description Retorna um ${nome_route^} pelo id
 * @path /:id
 * @method GET
 * @returns {Promise<any>} - {}
*/
${nome_route^}Router.get('/:id', ${nome_route}Controller.${nome_route^}GETdyId);

/** 
 * @description Cria um ${nome_route^}
 * @path /
 * @method POST
 * @returns {Promise<any>} - {}
*/
${nome_route^}Router.post('/', ${nome_route}Controller.${nome_route^}POST);

/** 
 * @description Atualiza um ${nome_route^} pelo id
 * @path /update/:id
 * @method PUT
 * @returns {Promise<any>} - {}
*/
${nome_route^}Router.put('/update/:id', ${nome_route}Controller.${nome_route^}PUT);

/** 
 * @description Exclui um ${nome_route^} pelo id
 * @path /delete/:id
 * @method DELETE
 * @returns {Promise<any>} - {}
*/
${nome_route^}Router.delete('/delete/:id', ${nome_route}Controller.${nome_route^}DELETE);

export default ${nome_route^}Router;
EOF

cat <<EOF > "${nome_route}Route/${nome_route}.http"
@host = "http://localhost:3041/${nome_route}"
@ID = "12" //id de teste

###

GET {{host}}/

###

GET {{host}}/{{ID}}

###

POST {{host}}/
content-type: application/json

{
    "name": "string",
}

###

PUT {{host}}/update/{{ID}}
content-type: application/json

{
    "name": "string",
}

###

DELETE {{host}}/delete/{{ID}}

###
EOF

# Retorna o caminho onde o diretório do controller foi criado
echo "$caminho_route"
