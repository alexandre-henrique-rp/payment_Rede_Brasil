import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../Authenticate';

export default async function updatePixPayment(dados: any) {
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
    throw error({
      message: 'Não foi possivel fazer o update do pagamento PIX',
      error,
    });
  }
}
