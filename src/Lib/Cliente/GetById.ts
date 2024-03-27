import { PrismaClient } from '@prisma/client';
import { GetFcweb } from '../../type/fcweb_type';
const prisma = new PrismaClient();

/**
 * Retrieve a specific GetFcweb entry based on the provided id.
 *
 * @param {number} id - The id of the GetFcweb entry to retrieve
 * @return {Promise<GetFcweb>} - { id, cpf, nome, valorcd } 
 */
export const GetFcwebLib = async (id: number): Promise<GetFcweb> => {
  try {
    const request = await prisma.fcweb.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cpf: true,
        nome: true,
        valorcd: true,       
      },      
    });
    return request;
  } catch (error: any) {
    console.error('Erro ao buscar registro por UUID:', error);
    throw new Error('Não foi possível buscar o registro: ' + error);
  }
};
