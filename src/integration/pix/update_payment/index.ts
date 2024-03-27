import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import { PixEfi } from '../../../type/pix';

/**
 * Updates a Pix payment using the provided data.
 *
 * @param {any} dados - Data needed to update the Pix payment
 * @return {Promise<PixEfi>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
export default async function updatePixPayment(dados: any): Promise<PixEfi> {
  try {
    const body = {
      calendario: {
        expiracao: 3600,
      },
      devedor: {
        cpf: dados.cpf,
        nome: dados.nome,
      },
      valor: {
        original: dados.valorcd.replace(',', '.'),
      },
      chave: process.env.CHAVE_PIX, // Informe sua chave Pix cadastrada na gerencianet
    };

    const params = {
      txid: dados.txid,
    };

    const efipay = new EfiPay(options);
    const PixPaymentCreate = await efipay.pixUpdateCharge(params, body);

    return PixPaymentCreate;
  } catch (error) {
    console.log('Não foi possivel fazer o update do pagamento PIX', error);
    throw {
      nome: error.nome,
      message: error.message || 'Erro interno do servidor',
      chave: error.erros[0].chave || '',
      caminho: error.erros[0].caminho || '',
      explicacao: error.erros[0].mensagem || '',
    };
  }
}
