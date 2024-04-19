import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';

/**
 * Gets a boleto payment using the provided id.
 * 
 * @param IdPayment - The id of the boleto payment.
 * @example
 * 
 * const IdPayment: number = 1;
 * 
 * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
export default async function GetByIdBoletoPayment(IdPayment: number): Promise<any> {
  try {
    const params = {
      id: IdPayment,
    };

    const efipay = new EfiPay(options);
    const BoletoPaymentGet = await efipay.detailCharge(params);

    return BoletoPaymentGet;
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
