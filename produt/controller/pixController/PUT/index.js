"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixPUT = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
/**
 * Handles the PUT request for the Pix API.
 *
 * @param {Request} req - params :uuid
 * @param {Response} res -  { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }
 */
const PixPUT = async (req, res) => {
    try {
        const { uuid } = req.params;
        const request = await pix_1.default.PUT(uuid);
        res.status(201).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.PixPUT = PixPUT;
