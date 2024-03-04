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

  /**
   * Retrieve a type certificate by its UUID.
   * @param {string} uuid - The UUID of the type certificate to retrieve
   * @return {Promise<GetTypeCert>} GetTypeCert - {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
   */
  async GETdyId(uuid: string): Promise<GetTypeCert> {
    try {
      const request = await prisma.price_cert.findUnique({
        where: {
          Uuid: uuid
        }
      });
      return request
    } catch (error: any) {
      return error
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
        data: dados
      })
      return request
    } catch (error: any) {
      return error
    }
  },

    /**
   * Update de link de pagamento.
   *
   * @param {string} uuid - UUID referente oa registro a ser atualizado
   * @param {any} body - The data to update the record with
   * @example body = {
    FcwebId: 1234, 
    Date_int: 2022-05-12T00:00:00.000Z, 
    Status_pg: 'PAGO', 
    Date_venc: 2022-05-12T00:00:00.000Z, 
    Cliente_acess: true, 
    Parcelas: 2, 
    TxidPix: 'içhbdpyipudihbyii8d61649', 
    TxidBoleto: 'lhbdspppuiui459684', 
    TxidCartao: '6s4s.94s+897+9', 
    QrLink: '', 
    QrBase64, 
    CreatePixDate, 
    PixStatus, 
    PixCopiaEC, 
    BarCode, 
    LinkBolix, 
    LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
   }
   * @return {Promise<GetTypeCert>} A Promise that resolves to the updated record
   */
  async PUT(uuid: string, body: any): Promise<GetTypeCert> {
    try {
      return await prisma.price_cert.update({
        where: {
          Uuid: uuid
        },
        data: body
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