import { PrismaClient } from "@prisma/client";
import { GetTypeCert } from "../../type/Price_cert_type";
const prisma = new PrismaClient()

 /**
   * Retrieve a type certificate by its UUID.
   * @param {string} uuid - The UUID of the type certificate to retrieve
   * @return {Promise<GetTypeCert>} GetTypeCert - {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
   */
export const GetLinkLib = async (uuid: string): Promise<GetTypeCert> => {
  try {
    const request = await prisma.price_cert.findUnique({
      where: {
        Uuid: uuid
      }
    });
    return request
  } catch (error: any) {
    console.error('Erro ao buscar registro por UUID:', error);
    throw new Error('Não foi possível buscar o registro: ' + error);
  }
}