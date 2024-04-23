"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_typescript_apis_efi_1 = __importDefault(require("sdk-typescript-apis-efi"));
const Authenticate_1 = __importDefault(require("../../Authenticate"));
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
async function GetByIdBoletoPayment(IdPayment) {
    try {
        const params = {
            id: IdPayment,
        };
        const efipay = new sdk_typescript_apis_efi_1.default(Authenticate_1.default);
        const BoletoPaymentGet = await efipay.detailCharge(params);
        return BoletoPaymentGet;
    }
    catch (error) {
        throw {
            nome: error.nome,
            message: error.message || 'Erro interno do servidor',
            chave: error.erros[0].chave || '',
            caminho: error.erros[0].caminho || '',
            explicacao: error.erros[0].mensagem || '',
        };
    }
}
exports.default = GetByIdBoletoPayment;
