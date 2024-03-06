import { PrismaClient } from '@prisma/client';
import { GetLinkLib } from '../../Lib/link/GetByUuid';
import { GetFcwebLib } from '../../Lib/Cliente/GetById';
const prisma = new PrismaClient();


const PixService = {
  async GET(): Promise<any> {
    try {
      // const pix = await prisma.'nome tabela'.findMany({
      //   take: 10
      // });
      // return pix;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async GETdyId(id: number): Promise<any> {
    try {
      // const pix = await prisma.'nome tabela'.findUnique({
      //   where: {
      //     id: id
      //   }
      // });
      // return pix;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async POST(data: any): Promise<any> {
    try {
      const requestLink = await GetLinkLib(data.uuid)
      const requestClient = await GetFcwebLib(requestLink.FcwebId)
     
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async PUT(id: number, data: any): Promise<any> {
    try {
      // const pix = await prisma.'nome tabela'.update({
      //   where: {
      //     id: id
      //   },
      //   data: data
      // });
      // return pix;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async DELETE(id: number): Promise<any> {
    try {
      // const pix = await prisma.'nome tabela'.delete({
      //   where: {
      //     id: id
      //   }
      // });
      // return pix;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
}

export default PixService;
