"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixGETdyId = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
/**
 *
 * @param {Request} req - {uuid: string}
 * @param {Response} res
 * @template {GetTypeCert} - res.json({Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao})
 */
const PixGETdyId = async (req, res) => {
    try {
        const { uuid } = req.params;
        const request = await pix_1.default.GETdyId(uuid);
        res.status(200).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.PixGETdyId = PixGETdyId;
