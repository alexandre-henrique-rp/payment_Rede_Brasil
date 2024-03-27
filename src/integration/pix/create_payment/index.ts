import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import Txid from '../../Txid';
import { PixEfi } from '../../../type/pix';

/**
 * 
 * @param dados - { cpf: string, nome: string, valorcd: string }
 * @returns {Promise<PixEfi>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
export default async function createPixPayment(dados: any): Promise<PixEfi> {
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
      txid: Txid(),
    };

    const efipay = new EfiPay(options);
    const PixPaymentCreate = await efipay.pixCreateImmediateCharge([], body);

    return PixPaymentCreate;
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
