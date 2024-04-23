"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixDELETE = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
const PixDELETE = async (req, res) => {
    try {
        const { uuid } = req.params;
        const request = await pix_1.default.DELETE(uuid);
        res.status(204).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.PixDELETE = PixDELETE;
