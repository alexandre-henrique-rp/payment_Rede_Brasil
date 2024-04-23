"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_typescript_apis_efi_1 = __importDefault(require("sdk-typescript-apis-efi"));
const Authenticate_1 = __importDefault(require("../../Authenticate"));
/**
 * Async function to list PIX payments.
 *
 * @param {any} dados - input data for the function {inicio: '22/01/2022', fim: '22/01/2022'}
 * @param {string} dados.inicio - start date ex: '22/01/2022'
 * @param {string} dados.fim - end date ex: '22/01/2022'
 * @return {Promise<any>} - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}
 */
async function listPixPayment(dados) {
    try {
        const params = {
            inicio: new Date(dados.inicio).toISOString(),
            fim: new Date(dados.fim).toISOString(),
        };
        const efipay = new sdk_typescript_apis_efi_1.default(Authenticate_1.default);
        const PixPaymentCreate = await efipay.pixListCharges(params);
        return PixPaymentCreate;
    }
    catch (error) {
        console.log('Não foi possivel criar o pagamento PIX', error);
        throw {
            nome: error.nome,
            message: error.message || 'Erro interno do servidor',
            chave: error.erros[0].chave || '',
            caminho: error.erros[0].caminho || '',
            explicacao: error.erros[0].mensagem || '',
        };
    }
}
exports.default = listPixPayment;
