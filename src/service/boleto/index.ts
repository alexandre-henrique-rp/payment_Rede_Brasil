import { PrismaClient } from '@prisma/client';
import { GetLinkLib } from '../../Lib/link/GetByUuid';
import { GetFcwebLib } from '../../Lib/Cliente/GetById';
import { GetTypeCert, UpdateTypeCert } from '../../type/Price_cert_type';
import { GetFcweb, UpdateFcweb } from '../../type/fcweb_type';
import { DadosCreateBoleto, RespostaBoleto } from '../../type/DadosBoletos';
import createBoletoPayment from '../../integration/boleto/create_payment';
import CepApi from '../../integration/cep';

import CancelBoletoPayment from '../../integration/boleto/cancel_payment';
import updateBoletoPayment from '../../integration/boleto/update_vencimento';
import GetByIdBoletoPayment from '../../integration/boleto/get_by_id_payment';
import { error } from 'console';
const prisma = new PrismaClient();

interface DataPostBoleto {
  id: any;
  expira: string;
  nome?: string;
  email: string;
  cpf?: string;
  dtnascimento: string;
  cep: string;
  razaosocial?: string;
  cnpj?: string;
  telefone: string;
  nrua: string;
}

const BoletoService = {

  /**
   * 
   * @param uuid 
   * @returns {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
   */
  async GETdyId(uuid: string): Promise<any> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(uuid);
      const id = Number(requestLink.TxidBoleto);
      const boleto = await GetByIdBoletoPayment(id)
      return boleto;
    } catch (error) {
      console.error('Erro ao buscar registro por UUID:', error);
      throw error;
    }
  },

  /**
   * 
   * @param data 
   * @example
   * {
   *   id: any;
   *   expira: string;
   *   nome: string;
   *   email: string;
   *   cpf: string;
   *   dtnascimento: string;
   *   cep: string;
   *   razaosocial: string;
   *   cnpj: string;
   *   telefone: string;
   *   nrua: string;
   }
   * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
   */
  async POST(data: DataPostBoleto): Promise<any> {
    try {
      const id = Number(data.id);
      const requestLink = await prisma.price_cert.create({
        data: {
          FcwebId: id,
          Status_pg: 'Falta pagamento',
          Date_int: new Date().toISOString(),
        },
      });

      const requestClient: GetFcweb = await GetFcwebLib(id);
      const DadosCep = await CepApi(data.cep);


      const dadosBoleto: DadosCreateBoleto = {
        expira: data.expira,
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        nasc: data.dtnascimento,
        cel: data.telefone,
        cep: data.cep,
        rua: DadosCep.logradouro,
        bairro: DadosCep.bairro,
        numero: data.nrua,
        complemento: DadosCep.complemento,
        uf: DadosCep.uf,
        cidade: DadosCep.cidade,
        razao: requestClient.razaosocial,
        cnpj: requestClient.cnpj,
        tipocd: requestClient.tipocd,
        item_name: `Certificado ${requestClient.tipocd} - Valido por ${requestClient.tipocd === "A1PF" ? "1 ano" : requestClient.tipocd === "A1PJ" ? "1 ano" : "3 anos"}`,
        item_valor: ValorProd(requestClient.valorcd),
        item_quantidade: 1
      }
      const CreateBoleto: RespostaBoleto = await createBoletoPayment(dadosBoleto);

      const DadosUpdate: UpdateTypeCert = {
        BarCode: CreateBoleto.data.barcode,
        QrBase64: CreateBoleto.data.pix.qrcode_image,
        LinkBoleto: CreateBoleto.data.billet_link,
        Date_venc: new Date(CreateBoleto.data.expire_at).toISOString(),
        LinkBoletoPdf: CreateBoleto.data.pdf.charge,
        LinkBolix: CreateBoleto.data.link,
        TxidBoleto: CreateBoleto.data.charge_id,
        Boleto: true
      }

      await prisma.price_cert.update({
        where: {
          Uuid: requestLink.Uuid
        },
        data: DadosUpdate
      });
      return CreateBoleto
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  },

  /**
   * Creates a boleto payment using the provided data.
   * 
   * @param Uuid - string
   * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
   */
  async POSTUuid(uuid: string): Promise<any> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(uuid);
      const requestClient: GetFcweb = await GetFcwebLib(requestLink.FcwebId);
      const DateAtual = new Date();
      DateAtual.setDate(DateAtual.getDate() + 5);
      const DateAltualString = DateAtual.toISOString().split('T')[0];

      const dadosBoleto: DadosCreateBoleto = {
        expira: DateAltualString,
        nome: requestClient.nome,
        email: requestClient.email,
        cpf: requestClient.cpf,
        nasc: requestClient.dtnascimento,
        cel: requestClient.telefone,
        cep: requestClient.cep,
        rua: requestClient.endereco,
        bairro: requestClient.bairro,
        numero: requestClient.nrua,
        complemento: requestClient.complemento,
        uf: requestClient.uf,
        cidade: requestClient.cidade,
        razao: requestClient.razaosocial,
        cnpj: requestClient.cnpj,
        tipocd: requestClient.tipocd,
        item_name: `Certificado ${requestClient.tipocd} - Valido por ${requestClient.tipocd === "A1PF" ? "1 ano" : requestClient.tipocd === "A1PJ" ? "1 ano" : "3 anos"}`,
        item_valor: ValorProd(requestClient.valorcd),
        item_quantidade: 1
      }
      const CreateBoleto: RespostaBoleto = await createBoletoPayment(dadosBoleto);

      const DadosUpdate: UpdateTypeCert = {
        BarCode: CreateBoleto.data.barcode,
        QrBase64: CreateBoleto.data.pix.qrcode_image,
        LinkBoleto: CreateBoleto.data.billet_link,
        Date_venc: new Date(CreateBoleto.data.expire_at).toISOString(),
        LinkBoletoPdf: CreateBoleto.data.pdf.charge,
        LinkBolix: CreateBoleto.data.link,
        TxidBoleto: CreateBoleto.data.charge_id,
        Boleto: true
      }

      await prisma.price_cert.update({
        where: {
          Uuid: uuid
        },
        data: DadosUpdate
      });
      return CreateBoleto
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  },


  /**
   * 
   * @param uuid 
   * @param data 
   * @example
   * {
   *   expira: string;
   * }
   * @returns 
   */
  async PUT(uuid: string, data: any): Promise<any> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(uuid);
      const id = Number(requestLink.TxidBoleto);
      const dataBanco = new Date(requestLink.Date_venc).toISOString().split('T')[0];
      console.log(dataBanco)
      console.log(data.expira)
      console.log(compararDatas(dataBanco, data.expira))


      const UpdateBoleto = await updateBoletoPayment({
        IdPayment: id,
        expira: data.expira
      });

      const DadosUpdate: UpdateTypeCert = {
        Date_venc: `${data.expira}T00:00:00.000Z`,
      }

      await prisma.price_cert.update({
        where: {
          Uuid: uuid
        },
        data: DadosUpdate
      });

      const DataVenc = data.expira.split('-');

      return {
        ...UpdateBoleto,
        expira: data.expira,
        mesage: `Boleto atualizado com sucesso! Vencimento: ${DataVenc[2]}/${DataVenc[1]}/${DataVenc[0]}`

      }
    } catch (error) {
      console.error('Erro ao editar registro:', error);
      throw error;
    }
  },


  /**
   * 
   * @param uuid 
   * @returns 
   */
  async DELETE(uuid: string): Promise<any> {
    try {
      const requestLink: GetTypeCert = await GetLinkLib(uuid);
      const id = Number(requestLink.TxidBoleto);

      const cancel = await CancelBoletoPayment({
        IdPayment: id,
      })

      await prisma.price_cert.update({
        where: {
          Uuid: uuid
        },
        data: {
          Boleto: false
        }
      });

      return cancel
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      throw error;
    }
  },
}

export default BoletoService;


const ValorProd = (preço: any) => {
  const valor = preço.toString().replace(/[.,]/g, '');
  if(valor < 1){
    throw "valor da emissão (0,00) é inferior ao limite mínimo para esta transação (0,01)"
  } else {
    return Number(valor);
  }
}

function compararDatas(dataBanco: string | number | Date, dataString: string | number | Date) {
  // Convertendo a string da data do banco para um objeto Date
  var dataBancoObj = new Date(dataBanco);

  // Convertendo a string da data fornecida para um objeto Date
  var dataFornecidaObj = new Date(dataString);

  // Comparando as datas
  if (dataBancoObj < dataFornecidaObj) {
    return "OK";
  } else if (dataBancoObj > dataFornecidaObj) {
    // throw new Error("A Data Fornecida é maior do que a data de vencimento atuale do Boleto.");
    throw "A Data Fornecida é maior do que a data de vencimento atuale do Boleto.";
    // return "A Data Fornecida é menor do que a data de vencimento atuale do Boleto.";
  } else {
    throw "A Data Fornecida é igual do que a data de vencimento atuale do Boleto.";
    // return "A Data Fornecida é igual do que a data de vencimento atuale do Boleto.";
  }
}