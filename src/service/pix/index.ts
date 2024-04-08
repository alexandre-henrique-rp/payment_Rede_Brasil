import { PrismaClient } from '@prisma/client';
import { GetLinkLib } from '../../Lib/link/GetByUuid';
import { GetFcwebLib } from '../../Lib/Cliente/GetById';
import createPixPayment from '../../integration/pix/create_payment';
import { GetFcweb } from '../../type/fcweb_type';
import { PixEfi, QrCodePixType } from '../../type/pix';
import { GetTypeCert } from '../../type/Price_cert_type';
import QrCodePix from '../../integration/pix/qrcode';
import { PixTypeResp } from '../../type/PixTypeResp';
import LinkService from '../link';
import updatePixPayment from '../../integration/pix/update_payment';
import getByTxidPixPayment from '../../integration/pix/get_by_txid_payment';
import listPixPayment from '../../integration/pix/list_payment';
const prisma = new PrismaClient();

const PixService = {
  /**
   * Retrieves all prices for a given certification.
   *
   * @param {any} data - {inicio: string, fim: string}.
   * @return {Promise<any>} - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}.
   */
  async GET(data: any): Promise<any> {
    try {
      const pix = await listPixPayment(data);
      return pix;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * A description of the entire function.
   *
   * @param {string} uuid - description of parameter
   * @return {Promise<any>} - {Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode, payment: {calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola}}
   */
  async GETdyId(uuid: string): Promise<any> {
    try {
      const pix = await prisma.price_cert.findUnique({
        where: {
          Uuid: uuid,
        },
      });
      const detalhePix = await getByTxidPixPayment(pix.TxidPix);
      const dataRetorno = {
        ...pix,
        payment: detalhePix,
      };
      return dataRetorno;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /**
   * Asynchronously posts data and returns a Promise of type PixEfi.
   *
   * @param {any} data - {uuid: string}
   * @return {Promise<PixTypeResp>} - {Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode}
   */
  async POST(data: any): Promise<PixTypeResp> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(data.uuid);
      const requestClient: GetFcweb = await GetFcwebLib(requestLink.FcwebId);
      const dadosPix = {
        cpf: requestClient.cpf,
        nome: requestClient.nome,
        valorcd: requestClient.valorcd,
      };
      const pixGenerated: PixEfi = await createPixPayment(dadosPix);
      const LocId = `${pixGenerated.loc.id}`;
      const Qrcode: QrCodePixType = await QrCodePix(LocId);
      const DadosUpdate = {
        Pix: true,
        TxidPix: pixGenerated.txid,
        QrLink: Qrcode.linkVisualizacao,
        QrBase64: Qrcode.imagemQrcode,
        PixCopiaECola: pixGenerated.pixCopiaECola,
        PixStatus: pixGenerated.status,
        CreatePixDate: pixGenerated.calendario.criacao,
      };
      console.log('DadosUpdate', DadosUpdate);
      const updatePriceCert = await LinkService.PUT(data.uuid, DadosUpdate);
      const data_retorno = {
        Uuid: updatePriceCert.Uuid,
        FcwebId: updatePriceCert.FcwebId,
        Criacao: pixGenerated.calendario.criacao,
        Expiracao: pixGenerated.calendario.expiracao,
        Status: pixGenerated.status,
        PixCopiaECola: pixGenerated.pixCopiaECola,
        LinkPgEfi: Qrcode.linkVisualizacao,
        Qrcode: Qrcode.imagemQrcode,
      };
      return data_retorno;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },

  /**
   * Updates a Pix record with the specified UUID and data.
   *
   * @param {number} uuid - The UUID of the Pix record to update.
   * @return {Promise<any>} - { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }.
   */
  async PUT(uuid: string): Promise<any> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(uuid);
      const requestClient: GetFcweb = await GetFcwebLib(requestLink.FcwebId);
      const dadosPix = {
        cpf: requestClient.cpf,
        nome: requestClient.nome,
        valorcd: requestClient.valorcd,
        txid: requestLink.TxidPix,
      };
      const UpdatePixGenerated: PixEfi = await updatePixPayment(dadosPix);
      console.log('UpdatePixGenerated', UpdatePixGenerated);
      const LocId = `${UpdatePixGenerated.loc.id}`;
      const Qrcode: QrCodePixType = await QrCodePix(LocId);
      const DadosUpdate = {
        Pix: true,
        TxidPix: UpdatePixGenerated.txid,
        QrLink: Qrcode.linkVisualizacao,
        QrBase64: Qrcode.imagemQrcode,
        PixCopiaECola: UpdatePixGenerated.pixCopiaECola,
        PixStatus: UpdatePixGenerated.status,
        CreatePixDate: UpdatePixGenerated.calendario.criacao,
      };
      const updatePriceCert = await LinkService.PUT(uuid, DadosUpdate);
      const data_retorno = {
        Uuid: updatePriceCert.Uuid,
        FcwebId: updatePriceCert.FcwebId,
        Criacao: UpdatePixGenerated.calendario.criacao,
        Expiracao: UpdatePixGenerated.calendario.expiracao,
        Status: UpdatePixGenerated.status,
        PixCopiaECola: UpdatePixGenerated.pixCopiaECola,
        LinkPgEfi: Qrcode.linkVisualizacao,
        Qrcode: Qrcode.imagemQrcode,
      };
      return data_retorno;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  },

  /**
   * Deletes a payment by its UUID.
   *
   * @param {string} uuid - The UUID of the payment to be deleted.
   * @return {Promise<string>} A promise that resolves to a string indicating the success of the deletion.
   */
  async DELETE(uuid: string): Promise<string> {
    try {
      await prisma.price_cert.update({
        where: {
          Uuid: uuid,
        },
        data: {
          Pix: false,
        },
      });
      return `Pagamento uuid: ${uuid} - deletado com sucesso`;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async pixVerifique(): Promise<any> {
    try {
      const lista = await prisma.price_cert.findMany({
        where: {
          Status_pg: 'Falta pagamento',
          Pix: true,
          TxidPix: {
            not: null
          }
        },
      });
      console.log('lista', lista);

      const mapList = await Promise.all(lista.map(async (item) => {
        const verifique = await getByTxidPixPayment(item.TxidPix);
        if (verifique.status === 'ATIVA') {
          const LocId = `${verifique.loc.id}`;
          const Qrcode: QrCodePixType = await QrCodePix(LocId);
          const DadosUpdate = {
            TxidPix: verifique.txid,
            QrLink: Qrcode.linkVisualizacao,
            QrBase64: Qrcode.imagemQrcode,
            PixCopiaECola: verifique.pixCopiaECola,
            PixStatus: verifique.status,
            CreatePixDate: verifique.calendario.criacao,
          };
          await LinkService.PUT(item.Uuid, DadosUpdate);
        const data = {
          Uuid: item.Uuid,
          FcwebId: item.FcwebId,
          Criacao: verifique.calendario.criacao,
          Expiracao: verifique.calendario.expiracao,
          Status: verifique.status,
          PixCopiaECola: verifique.pixCopiaECola,
          LinkPgEfi: Qrcode.linkVisualizacao,
          Qrcode: Qrcode.imagemQrcode,
        }
          return data;
        } else {
          const DadosUpdate = { 
            Status_pg: 'Pago'
          };
          await LinkService.PUT(item.Uuid, DadosUpdate);
          const cliente = await prisma.fcweb.findUnique({
            where: {
              id: item.FcwebId
            },
            select: {
              id: true,
              historico: true
            }
          });

          const DateAtual = new Date();
          const dia = DateAtual.getDate() > 9 ? DateAtual.getDate() : `0${DateAtual.getDate()}`;
          const mes = DateAtual.getMonth() + 1 > 9 ? DateAtual.getMonth() + 1 : `0${DateAtual.getMonth() + 1}`;
          const ano = DateAtual.getFullYear();
          const dataFormatada = `${dia}-${mes}-${ano}`;
          const hora = DateAtual.getHours();
          const minuto = DateAtual.getMinutes();
          const segundo = DateAtual.getSeconds();
          const data_hora = `${dataFormatada}.${hora}:${minuto}:${segundo}`;
          const novoHistorico = `${cliente?.historico}${data_hora} - Efi - cleinete efetuou o pagamento - ${verifique.pixCopiaECola}\n`;

          await prisma.fcweb.update({
            where: {
              id: item.FcwebId
            },
            data: {
              estatos_pgto: 'Concluido',
              pgto_efi: 'Pago Pix Efi',
            } 
          })
        }
      }));
      console.log(mapList);
      return 'ola';
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  // async pixVerifiqueById(uuid: string): Promise<string> {
  //   try {
  //     await prisma.price_cert.update({
  //       where: {
  //         Uuid: uuid,
  //       },
  //       data: {
  //         Pix: false,
  //       },
  //     });
  //     return `Pagamento uuid: ${uuid} - deletado com sucesso`;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(error);
  //   }
  // },
};

export default PixService;
