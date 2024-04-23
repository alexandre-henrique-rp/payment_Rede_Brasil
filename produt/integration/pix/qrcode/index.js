"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_typescript_apis_efi_1 = __importDefault(require("sdk-typescript-apis-efi"));
const Authenticate_1 = __importDefault(require("../../Authenticate"));
// import axios from 'axios';
/**
 * Gera um QR code a partir de um link fornecido e retorna sua representação em base64.
 * @param link O link que será codificado no QR code.
 * @returns Uma Promise que resolve com a representação em base64 do QR code gerado.
 * @throws Se ocorrer um erro durante a geração do QR code.
 */
async function QrCodePix(link) {
    try {
        const params = {
            id: link,
        };
        const efipay = new sdk_typescript_apis_efi_1.default(Authenticate_1.default);
        const PixPaymentCreate = await efipay.pixGenerateQRCode(params);
        return PixPaymentCreate;
    }
    catch (error) {
        throw error;
    }
}
exports.default = QrCodePix;
