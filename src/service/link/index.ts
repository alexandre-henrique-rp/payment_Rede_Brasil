import { PrismaClient } from '@prisma/client';
import {
  DeletePriceCert,
  GetAllPriceCert,
  GetTypeCert,
} from '../../type/Price_cert_type';

const prisma = new PrismaClient();

const LinkService = {
  /**
   * @returns {Promise<GetAllPriceCert>} - {data:[{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess, UrlPg, Pix,  Boleto,  Cartao}, ...], count: number}
   */
  async GET(): Promise<GetAllPriceCert> {
    try {
      const request = await prisma.price_cert.findMany({
        orderBy: {
          FcwebId: 'asc',
        },
        select: {
          Uuid: true,
          FcwebId: true,
          Date_int: true,
          Status_pg: true,
          Cliente_acess: true,
          UrlPg: true,
          Boleto: true,
          Pix: true,
          Cartao: true,
        },
      });
      const data = { data: request, count: request.length };
      return data;
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error);
      throw new Error('Não foi possível buscar os dados: ' + error);
    }
  },

  /**
   * Retrieve a type certificate by its UUID.
   * @param {string} uuid - The UUID of the type certificate to retrieve
   * @return {Promise<GetTypeCert>} GetTypeCert - {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
   */
  async GETdyId(uuid: string): Promise<GetTypeCert> {
    try {
      const request = await prisma.price_cert.findUnique({
        where: {
          Uuid: uuid,
        },
      });
      return request;
    } catch (error: any) {
      console.error('Erro ao buscar registro por UUID:', error);
      throw new Error('Não foi possível buscar o registro: ' + error);
    }
  },

  /**
   * A function that performs a POST request with the given data and returns the result.
   *
   * @param {any} dados - the data to be used in the POST request
   * @return {Promise<GetTypeCert>} {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
   */
  async POST(dados: any): Promise<GetTypeCert> {
    try {
      const request = await prisma.price_cert.create({
        data: dados,
      });
      return request;
    } catch (error: any) {
      console.error('Erro ao criar registro:', error);
      throw new Error('Não foi possível criar o registro: ' + error);
    }
  },

  /**
   * Update de link de pagamento.
   *
   * @param {string} uuid - UUID referente oa registro a ser atualizado
   * @param {any} body - The data to update the record with
   * @return {Promise<GetTypeCert>} A Promise that resolves to the updated record
   */
  async PUT(uuid: string, body: any): Promise<GetTypeCert> {
    try {
      return await prisma.price_cert.update({
        where: {
          Uuid: uuid,
        },
        data: body,
      });
    } catch (error: any) {
      console.error('Erro ao editar registro:', error);
      throw new Error('Não foi possível editar o registro: ' + error);
    }
  },

  /**
   * DELETE function deletes a price certificate by uuid.
   *
   * @param {string} uuid - The uuid of the price certificate to be deleted
   * @return {Promise<DeletePriceCert>} The deleted price certificate and a success message
   * @throws {Error} If an error occurs while deleting the price certificate
   */
  async DELETE(uuid: string): Promise<DeletePriceCert> {
    try {
      await prisma.price_cert.deleteMany({
        where: {
          Uuid: uuid,
        },
      });
      return {
        message: 'Registro excluído com sucesso!',
        Reference: uuid,
      };
    } catch (error: any) {
      console.error('Erro ao excluir registro:', error);
      throw new Error('Não foi possível excluir o registro: ' + error);
    }
  },
};

export default LinkService;
