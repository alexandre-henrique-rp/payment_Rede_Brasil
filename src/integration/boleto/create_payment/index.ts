import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import Txid from '../../Txid';
import { DadosCreateBoleto } from '../../../type/DadosBoletos';

/**
 * Creates a boleto payment using the provided data.
 *
 * @param {any} dados - 
 * @example
 * const dadosPf: DadosCreateBoleto = {
 *   expira: string;
 *   nome?: string;
 *   email: string;
 *   cpf?: string;
 *   nasc: string;
 *   cel: string;
 *   cep: string;
 *   rua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   tipocd: string;
 *   valorcd: number;
 }
 *
 *const dadosPj: DadosCreateBoleto = {
 *   expira: string;
 *   email: string;
 *   cnpj?: string;
 *   razao?: string;
 *   cel: string;
 *   cep: string;
 *   rua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   tipocd: string;
 *   valorcd: number;
 }
 * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
export default async function createBoletoPayment(dados: DadosCreateBoleto): Promise<any> {
  try {
    const body = {
      payment: {
        banking_billet: dados.cnpj == '' ? {
          expire_at: dados.expira,
          customer: {
            name: dados.nome,
            email: dados.email,
            cpf: dados.cpf,
            birth: dados.nasc,
            phone_number: dados.cel,
            address: {
              street: dados.rua,
              number: dados.numero,
              neighborhood: dados.bairro,
              zipcode: dados.cep,
              city: dados.cidade,
              complement: dados.complemento,
              state: dados.uf
            }
          },
          message: "Esteja ciente de que haverá uma taxa de R$ 5,00 para a segunda via de boleto ou reemissão.",
        } : {
          expire_at: dados.expira,
          customer: {
            email: dados.email,
            phone_number: dados.cel,
            juridical_person: {
              corporate_name: dados.razao,
              cnpj: dados.cnpj,
            },
            address: {
              street: dados.rua,
              number: dados.numero,
              neighborhood: dados.bairro,
              zipcode: dados.cep,
              city: dados.cidade,
              complement: dados.complemento,
              state: dados.uf
            }
          },
          message: "Esteja ciente de que haverá uma taxa de R$ 5,00 para a segunda via de boleto ou reemissão.",
        }
      },

      items: [
        {
          name: dados.item_name,
          value: dados.item_valor,
          amount: dados.item_quantidade,
        },
      ],

      metadata: {
      notification_url: `${process.env.NOTIFICATION_URL}/boleto`,
      },
    };


    const efipay = new EfiPay(options);
    const BoletoPaymentCreate = await efipay.createOneStepCharge([], body);

    return BoletoPaymentCreate;
  } catch (error: any) {
    console.error(error);
    throw {
      nome: error.nome || error.error,
      message: error.message || error.error_description,
      chave: error.erros[0].chave || '',
      caminho: error.erros[0].caminho || '',
      explicacao: error.erros[0].mensagem || '',
    };
  }
}
