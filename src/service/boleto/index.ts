import { PrismaClient } from '@prisma/client';
import { GetLinkLib } from '../../Lib/link/GetByUuid';
import { GetFcwebLib } from '../../Lib/Cliente/GetById';
import { GetTypeCert, UpdateTypeCert } from '../../type/Price_cert_type';
import { GetFcweb, UpdateFcweb } from '../../type/fcweb_type';
import { DadosCreateBoleto, RespostaBoleto } from '../../type/DadosBoletos';
import createBoletoPayment from '../../integration/boleto/create_payment';
const prisma = new PrismaClient();


const BoletoService = {
  async GET(): Promise<any> {
    try {
      // const boleto = await prisma.'nome tabela'.findMany({
      //   take: 10
      // });
      // const data = {data: boleto, count: boleto.length}
      // return data
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  },

  async GETdyId(id: number): Promise<any> {
    try {
      // const boleto = await prisma.'nome tabela'.findUnique({
      //   where: {
      //     id: id
      //   }
      // });
      // return boleto;
    } catch (error) {
       console.error('Erro ao buscar registro por UUID:', error);
      throw error;
    }
  },

  async POST(data: any): Promise<any> {
    try {
      const id = data.id;
      const requestLink = await prisma.price_cert.create({
        data: {
          FcwebId: Number(id),
          Status_pg: 'Falta pagamento',
          Date_int: new Date().toISOString(),
        },
      });

      const requestClient: GetFcweb = await GetFcwebLib(id);
      

      const dadosBoleto: DadosCreateBoleto = {
        expira: data.expira,
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        nasc: data.dtnascimento,
        cel: data.telefone,
        cep: data.cep,
        rua: data.endereco,
        bairro: data.bairro,
        numero: data.nrua,
        complemento: data.complemento,
        uf: data.uf,
        cidade: data.cidade,
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
        where:{
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
   * Creates a boleto payment using the provided data.
   * 
   * @param {any} data - { Uuid: string; }
   * @example
   * {
   *   Uuid: string;
   * }
   * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
   */
  async POSTUuid(data: any): Promise<any> {
    try {
      const uuid = data.Uuid;
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
        where:{
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

  async PUT(id: number, data: any): Promise<any> {
    try {
      // const boleto = await prisma.'nome tabela'.update({
      //   where: {
      //     id: id
      //   },
      //   data: data
      // });
      // return boleto;
    } catch (error) {
      console.error('Erro ao editar registro:', error);
      throw error;
    }
  },

  async DELETE(id: number): Promise<any> {
    try {
      // await prisma.'nome tabela'.delete({
      //   where: {
      //     id: id
      //   }
      // });
      return {
        message: 'Registro excluído com sucesso!',
        Reference: id
      };
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      throw error;
    }
  },
}

export default BoletoService;


const ValorProd = (preço:any) => {
  const valor = preço.toString().replace(/[.,]/g, '');
  return Number(valor);
}