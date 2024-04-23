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
 * @param {string} idCliente - input txid cliente ex: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd'
 * @return {Promise<PixEfi>} the created PIX payment
 */
async function getByTxidPixPayment(idCliente) {
    try {
        const params = {
            txid: idCliente,
        };
        const efipay = new sdk_typescript_apis_efi_1.default(Authenticate_1.default);
        const PixPaymentCreate = await efipay.pixDetailCharge(params);
        return PixPaymentCreate;
    }
    catch (error) {
        console.log('Não foi possivel criar o pagamento PIX', error);
        throw error;
    }
}
exports.default = getByTxidPixPayment;
