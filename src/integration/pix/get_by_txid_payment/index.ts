import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';

/**
 * Async function to list PIX payments.
 *
 * @param {string} idCliente - input txid cliente ex: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd'
 * @return {Promise<any>} the created PIX payment
 */
export default async function getByTxidPixPayment(
  idCliente: string,
): Promise<any> {
  try {
    const params = {
      txid: idCliente,
    };

    const efipay = new EfiPay(options);
    const PixPaymentCreate = await efipay.pixDetailCharge(params);

    return PixPaymentCreate;
  } catch (error) {
    console.log('Não foi possivel criar o pagamento PIX', error);
    throw error({
      message: 'Não foi possivel criar o pagamento PIX',
      error,
    });
  }
}
