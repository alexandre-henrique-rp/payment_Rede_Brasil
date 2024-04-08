
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
      const data = {data: ${nome_service}, count: ${nome_service}.length}
      return data
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
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
       console.error('Erro ao buscar registro por UUID:', error);
      throw error;
    }
  },

  async POST(data: any): Promise<any> {
    try {
      // const ${nome_service} = await prisma.'nome tabela'.create({
      //   data: data
      // });
      // return ${nome_service};
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
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
      console.error('Erro ao editar registro:', error);
      throw error;
    }
  },

  async DELETE(id: number): Promise<any> {
    try {
      // await prisma.'nome tabela'.delete({
      //   where: {
      //     id: id
      //   }
      // });
      return {
        message: 'Registro excluído com sucesso!',
        Reference: id
      };
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      throw error;
    }
  },
}

export default ${nome_service^}Service;
EOF

# Retorna o caminho onde o diretório do controller foi criado
echo "$caminho_service"
