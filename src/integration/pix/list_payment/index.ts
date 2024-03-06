import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';

/**
 * Async function to list PIX payments.
 *
 * @param {any} dados - input data for the function {inicio: '2022-01-22T16:01:35Z', fim: '2022-01-22T16:01:35Z'}
 * @param {string} dados.inicio - start date ex: '2022-01-22T16:01:35Z'
 * @param {string} dados.fim - end date ex: '2022-01-22T16:01:35Z'
 * @return {Promise<any>} the created PIX payment
 */
export default async function listPixPayment(dados: any): Promise<any> {
  try {
    const params = {
      inicio: dados.inicio,
      fim: dados.fim,
    };

    const efipay = new EfiPay(options);
    const PixPaymentCreate = await efipay.pixListCharges(params);

    return PixPaymentCreate;
  } catch (error) {
    console.log('Não foi possivel criar o pagamento PIX', error);
    throw error({
      message: 'Não foi possivel criar o pagamento PIX',
      error,
    });
  }
}
