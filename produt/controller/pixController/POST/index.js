"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixPOST = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
/**
 * Handles a POST request to the Pix endpoint.
 *
 * @param {Request} req - {uuid: string}
 * @param {Response} res - { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }.
 */
const PixPOST = async (req, res) => {
    try {
        const { body } = req;
        const request = await pix_1.default.POST(body);
        res.status(201).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.PixPOST = PixPOST;
