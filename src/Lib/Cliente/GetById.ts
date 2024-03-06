import { PrismaClient } from "@prisma/client";
import { GetFcweb } from "../../type/fcweb_type";
const prisma = new PrismaClient()

 
export const GetFcwebLib = async (id: number): Promise<GetFcweb> => {
  try {
    const request = await prisma.fcweb.findUnique({
      where: {
        id: id
      }
    });
    return request
  } catch (error: any) {
    console.error('Erro ao buscar registro por UUID:', error);
    throw new Error('Não foi possível buscar o registro: ' + error);
  }
}