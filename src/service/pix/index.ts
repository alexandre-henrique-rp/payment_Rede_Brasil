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
      const request = await verifiquePixFunc(uuid);
      return request;
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
      // console.log('lista', lista);

      const mapList = await Promise.all(lista.map(async (item) => {
        const verifique = await verifiquePixFunc(item.Uuid);
        return verifique;
      }));

      return mapList;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default PixService;


async function verifiquePixFunc(uuid: string) {
  try {
    const pix = await prisma.price_cert.findUnique({
      where: {
        Uuid: uuid,
      },
    });
    
    const detalhePix = await getByTxidPixPayment(pix.TxidPix);

    if (detalhePix.status === 'ATIVA') {
      const LocId = `${detalhePix.loc.id}`;
      const Qrcode: QrCodePixType = await QrCodePix(LocId);
      const DadosUpdate = {
        TxidPix: detalhePix.txid,
        QrLink: Qrcode.linkVisualizacao,
        QrBase64: Qrcode.imagemQrcode,
        PixCopiaECola: detalhePix.pixCopiaECola,
        PixStatus: detalhePix.status,
        CreatePixDate: detalhePix.calendario.criacao,
      };
      await LinkService.PUT(pix.Uuid, DadosUpdate);

      const data = {
        Uuid: pix.Uuid,
        FcwebId: pix.FcwebId,
        Criacao: detalhePix.calendario.criacao,
        Expiracao: detalhePix.calendario.expiracao,
        Status: detalhePix.status,
        PixCopiaECola: detalhePix.pixCopiaECola,
        LinkPgEfi: Qrcode.linkVisualizacao,
        Qrcode: Qrcode.imagemQrcode,
      }
      return data;

    } else {

      const cliente = await prisma.fcweb.findUnique({
        where: {
          id: pix.FcwebId
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

      const DataPg = new Date(detalhePix.pix[0]?.horario);
      const diaPg = DataPg.getDate() > 9 ? DataPg.getDate() : `0${DataPg.getDate()}`;
      const mesPg = DataPg.getMonth() + 1 > 9 ? DataPg.getMonth() + 1 : `0${DataPg.getMonth() + 1}`;
      const anoPg = DataPg.getFullYear();
      const dataFormatadaPg = `${diaPg}/${mesPg}/${anoPg}`;
      const horaPg = DataPg.getHours();
      const minutoPg = DataPg.getMinutes();
      const segundoPg = DataPg.getSeconds();
      const data_horaPg = `${dataFormatadaPg} as ${horaPg}:${minutoPg}:${segundoPg}`;

      const novoHistorico = `${cliente?.historico}${data_hora} - Efi - cleinete efetuou o pagamento efetuado em: ${data_horaPg}\n`;

      await prisma.fcweb.update({
        where: {
          id: pix.FcwebId
        },
        data: {
          formapgto: 'PIX',
          vectoboleto: detalhePix.pix[0]?.horario,
          estatos_pgto: 'Pago',
          pgto_efi: 'Pago Pix Efi',
          historico: novoHistorico
        },
        select: {
          id: true,
          estatos_pgto: true,
          pgto_efi: true,
          historico: true
        }
      })
      const DadosUpdate = {
        Status_pg: 'Pago',
        Date_pg: detalhePix.pix[0]?.horario
      };
      await LinkService.PUT(pix.Uuid, DadosUpdate);

      const data = {
        Uuid: pix.Uuid,
        FcwebId: pix.FcwebId,
        Status: detalhePix.status,
      }
      return data;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

