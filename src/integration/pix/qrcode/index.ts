import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import { QrCodePixType } from '../../../type/pix';
// import axios from 'axios';

/**
 * Gera um QR code a partir de um link fornecido e retorna sua representação em base64.
 * @param link O link que será codificado no QR code.
 * @returns Uma Promise que resolve com a representação em base64 do QR code gerado.
 * @throws Se ocorrer um erro durante a geração do QR code.
 */
async function QrCodePix(link: string): Promise<QrCodePixType> {
  try {
    const params = {
      id: link,
    };
    const efipay = new EfiPay(options);
    const PixPaymentCreate = await efipay.pixGenerateQRCode(params);
    return PixPaymentCreate;
  } catch (error) {
    throw error;
  }
}

export default QrCodePix;
