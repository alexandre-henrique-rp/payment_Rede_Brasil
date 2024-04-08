#!/bin/bash

# Verifica se foi fornecido um parâmetro
if [ -z "$1" ]; then
    echo "Por favor, forneça um nome para o controller."
    exit 1
fi

# Captura o diretório onde o script está localizado
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Vai para o diretório raiz do projeto
cd "$script_dir/../../" || exit

# Salva o nome fornecido como parâmetro
nome_controller=$1

# Cria a pasta do controller se ainda não existir
controller_dir="src/controller/${nome_controller}Controller"
if [ ! -d "$controller_dir" ]; then
    mkdir -p "$controller_dir"
else
    echo "Diretório ${controller_dir} já existe."
fi

# Cria as pastas GET, GETdyId, POST, PUT, DELETE se ainda não existirem
cd "$controller_dir" || exit
for pasta in GET GETdyId POST PUT DELETE; do
    pasta_dir="${pasta}"
    if [ ! -d "$pasta_dir" ]; then
        mkdir "$pasta_dir"
        echo "import { Request, Response } from 'express';" > "${pasta_dir}/index.ts"
        echo "import ${nome_controller^}Service from '../../../service/${nome_controller}';" >> "${pasta_dir}/index.ts"
        echo "" >> "${pasta_dir}/index.ts"
        echo "" >> "${pasta_dir}/index.ts"
        echo "export const ${nome_controller^}${pasta^} = async (req: Request, res: Response) => {" >> "${pasta_dir}/index.ts"
        echo "  try {" >> "${pasta_dir}/index.ts"
        if [ "$pasta" == "DELETE" ] || [ "$pasta" == "GETdyId" ]; then
            echo "    const { id } = req.params;" >> "${pasta_dir}/index.ts"
            echo "    const request = await ${nome_controller^}Service.${pasta}(Number(id));" >> "${pasta_dir}/index.ts"
        elif [ "$pasta" == "POST" ]; then
            echo "    const { body } = req;" >> "${pasta_dir}/index.ts"
            echo "    const request = await ${nome_controller^}Service.${pasta}(body);" >> "${pasta_dir}/index.ts"
        elif [ "$pasta" == "PUT" ]; then
            echo "    const { id } = req.params;" >> "${pasta_dir}/index.ts"
            echo "    const { body } = req;" >> "${pasta_dir}/index.ts"
            echo "    const request = await ${nome_controller^}Service.${pasta}(Number(id), body);" >> "${pasta_dir}/index.ts"
        else
            echo "    const request = await ${nome_controller^}Service.${pasta}();" >> "${pasta_dir}/index.ts"
        fi
        # Define o código de status com base na pasta
        if [ "$pasta" == "GET" ] || [ "$pasta" == "GETdyId" ]; then
            status_code=200
        elif [ "$pasta" == "POST" ] || [ "$pasta" == "PUT" ]; then
            status_code=201
        else
            status_code=204
        fi
        echo "    res.status(${status_code}).json(request);" >> "${pasta_dir}/index.ts"
        echo "  } catch (error) {" >> "${pasta_dir}/index.ts"
        echo "    console.error(error);" >> "${pasta_dir}/index.ts"
        echo "    res.status(500).json({ message: 'Erro interno do servidor', erro: error });" >> "${pasta_dir}/index.ts"
        echo "  }" >> "${pasta_dir}/index.ts"
        echo "};" >> "${pasta_dir}/index.ts"
    else
        echo "Diretório ${pasta_dir} já existe."
    fi
done

# Cria o arquivo index.ts na pasta ${nome_controller}Controller se ainda não existir
if [ ! -f "index.ts" ]; then
    echo "" > index.ts
    for pasta in GET GETdyId POST PUT DELETE; do
        echo "import { ${nome_controller^}${pasta^} } from './${pasta^}';" >> index.ts
    done
    echo "" >> index.ts
    echo "const ${nome_controller}Controller = {" >> index.ts
    for pasta in GET GETdyId POST PUT DELETE; do
        echo "  ${nome_controller^}${pasta^}," >> index.ts
    done
    echo "};" >> index.ts
    echo "" >> index.ts
    echo "export default ${nome_controller}Controller;" >> index.ts
    echo "Controller '${nome_controller}' criado com sucesso!"
else
    echo "Arquivo index.ts já existe."
fi

# Retorna o caminho onde o diretório do controller foi criado
echo "$(realpath "$controller_dir")"
