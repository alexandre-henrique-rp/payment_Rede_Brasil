"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoGETdyId = void 0;
const boleto_1 = __importDefault(require("../../../service/boleto"));
/**
 *
 * @param req.params.uuid
 * @param res.status.json
 */
const BoletoGETdyId = async (req, res) => {
    try {
        const { uuid } = req.params;
        const request = await boleto_1.default.GETdyId(uuid);
        res.status(200).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.BoletoGETdyId = BoletoGETdyId;
