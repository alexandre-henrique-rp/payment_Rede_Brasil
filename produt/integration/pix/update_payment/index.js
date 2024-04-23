"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_typescript_apis_efi_1 = __importDefault(require("sdk-typescript-apis-efi"));
const Authenticate_1 = __importDefault(require("../../Authenticate"));
/**
 * Updates a Pix payment using the provided data.
 *
 * @param {any} dados - Data needed to update the Pix payment
 * @return {Promise<PixEfi>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
async function updatePixPayment(dados) {
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
        const efipay = new sdk_typescript_apis_efi_1.default(Authenticate_1.default);
        const PixPaymentCreate = await efipay.pixUpdateCharge(params, body);
        return PixPaymentCreate;
    }
    catch (error) {
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
exports.default = updatePixPayment;
