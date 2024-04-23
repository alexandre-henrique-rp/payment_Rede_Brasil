"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixGET = void 0;
const pix_1 = __importDefault(require("../../../service/pix"));
/**
 * Handles a GET request for Pix data and returns the response.
 *
 * @param {Request} req - { inicio: string, fim: string}.
 * @param {Response} res - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}.
 */
const PixGET = async (req, res) => {
    try {
        const data = req.body;
        if (!data.inicio || !data.fim) {
            throw new Error('Os campos inicio e fim, nos padroes ISO, devem ser informados e preenchidos com datas e horas, sao obrigatorios');
        }
        const request = await pix_1.default.GET(data);
        res.status(200).json(request);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', erro: error });
    }
};
exports.PixGET = PixGET;
