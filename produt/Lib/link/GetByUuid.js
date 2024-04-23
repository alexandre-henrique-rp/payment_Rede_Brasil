"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLinkLib = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Retrieve a type certificate by its UUID.
 * @param {string} uuid - The UUID of the type certificate to retrieve
 * @return {Promise<GetTypeCert>} GetTypeCert - {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
 */
const GetLinkLib = async (uuid) => {
    try {
        const request = await prisma.price_cert.findUnique({
            where: {
                Uuid: uuid,
            },
        });
        return request;
    }
    catch (error) {
        console.error('Erro ao buscar registro por UUID:', error);
        throw new Error('Não foi possível buscar o registro: ' + error);
    }
};
exports.GetLinkLib = GetLinkLib;
