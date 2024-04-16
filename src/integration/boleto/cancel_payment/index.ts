import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import { DadosUpdateBoleto } from '../../../type/DadosBoletos';

/**
 * Creates a boleto payment using the provided data.
 *
 * @param {any} dados - 
 * @example
 * {
 *   expira: string;
 *   IdPayment: number;
 * }
 * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
export default async function updateBoletoPayment(dados: DadosUpdateBoleto): Promise<any> {
  try {
    const params = {
      id: dados.IdPayment,
    };

    const efipay = new EfiPay(options);
    const BoletoPaymentCreate = await efipay.cancelCharge(params);

    return BoletoPaymentCreate;
  } catch (error: any) {
    throw {
      nome: error.nome,
      message: error.message || 'Erro interno do servidor',
      chave: error.erros[0].chave || '',
      caminho: error.erros[0].caminho || '',
      explicacao: error.erros[0].mensagem || '',
    };
  }
}
