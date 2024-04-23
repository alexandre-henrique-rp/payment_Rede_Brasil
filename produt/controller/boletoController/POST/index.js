"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoPOST = void 0;
const boleto_1 = __importDefault(require("../../../service/boleto"));
/**
 *
 * @param req body
 * @example
 * {
 *   id: any;
 *   expira: string;
 *   nome: string;
 *   email: string;
 *   cpf: string;
 *   dtnascimento: string;
 *   cep: string;
 *   razaosocial: string;
 *   cnpj: string;
 *   telefone: string;
 *   nrua: string;
 }
 * @param res
 */
const BoletoPOST = async (req, res) => {
    try {
        const data = req.body;
        const request = await boleto_1.default.POST(data);
        res.status(201).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.BoletoPOST = BoletoPOST;
