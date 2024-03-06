import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';
import Txid from '../../Txid';

export default async function createPixPayment(dados: any) {
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
    const PixPaymentCreate = await efipay.pixCreateCharge(params, body);

    return PixPaymentCreate;
  } catch (error) {
    console.log('Não foi possivel criar o pagamento PIX', error);
    throw error({
      message: 'Não foi possivel criar o pagamento PIX',
      error,
    });
  }
}
