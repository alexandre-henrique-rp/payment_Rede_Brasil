import { PrismaClient } from '@prisma/client'
import { GetTypeCert } from '../../type/Price_cert_type'
const prisma = new PrismaClient()

const LinkService = {

  /**
   * @returns any - [{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess,  Date_venc,  Parcelas,  TxidPix,  TxidBoleto,  TxidCartao,  QrLink,  QrBase64,  CreatePixDate,  PixStatus,  PixCopiaEC,  BarCode,  LinkBolix,  LinkBoleto,  Card_Adm,  payment_to,  payment_ur,  UrlPg,  createdAt,  updatedAt, Pix,  Boleto,  Cartao}, ...]
   */
  async GET(): Promise<GetTypeCert[]> {
    try {
      return await prisma.price_cert.findMany({
        take: 10
      })
    } catch (error: any) {
      return error
    }
  },

  async POST(dados: any): Promise<GetTypeCert> {
    try {
      const request = await prisma.price_cert.create({
        data: dados
      })
      return request
    } catch (error: any) {
      return error
    }
  },

  async PUT(): Promise<GetTypeCert[]> {
    try {
      return await prisma.price_cert.findMany({
        take: 10
      })
    } catch (error: any) {
      return error
    }
  },

  async DELETE(): Promise<GetTypeCert[]> {
    try {
      return await prisma.price_cert.findMany({
        take: 10
      })
    } catch (error: any) {
      return error
    }
  },
}


export default LinkService