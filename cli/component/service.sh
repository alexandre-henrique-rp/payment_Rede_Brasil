
#!/bin/bash

# Passo 1: Capturar o parâmetro passado e salvar na variável nome_service
nome_service=$1

# Passo 2: Sair de dentro de 2 pastas
cd "$(dirname "$0")/../../" || exit

# Passo 3: Entrar na pasta src/service
cd src/service || exit

# Passo 4: Criar uma pasta com o nome fornecido 
mkdir "${nome_service}"

# Captura o diretório atual onde o script está sendo executado
caminho_atual=$(pwd)

# Captura o caminho onde o diretório do service está sendo criado
caminho_service="$caminho_atual/src/service/${nome_service}"


# Passo 5: Criar o arquivo index.ts com o conteúdo especificado
cat <<EOF > "${nome_service}/index.ts"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const ${nome_service^}Service = {
  async GET(): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.findMany({
      //   take: 10
      // });
      // return ${nome_service};
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async GETdyId(id: number): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.findUnique({
      //   where: {
      //     id: id
      //   }
      // });
      // return ${nome_service};
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async POST(data: any): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.create({
      //   data: data
      // });
      // return ${nome_service};
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async PUT(id: number, data: any): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.update({
      //   where: {
      //     id: id
      //   },
      //   data: data
      // });
      // return ${nome_service};
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async DELETE(id: number): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.delete({
      //   where: {
      //     id: id
      //   }
      // });
      // return ${nome_service};
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
}

export default ${nome_service^}Service;
EOF

# Retorna o caminho onde o diretório do controller foi criado
echo "$caminho_service"
