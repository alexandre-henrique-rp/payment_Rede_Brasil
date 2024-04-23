"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFIQUE = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
const VERIFIQUE = async (req, res) => {
    try {
        console.log('verifique');
        const request = await pix_1.default.pixVerifique();
        res.status(200).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.VERIFIQUE = VERIFIQUE;
