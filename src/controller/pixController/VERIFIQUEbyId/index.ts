import { Request, Response } from 'express';
import PixService from '../../../service/pix';

/**
 * Handles a GET request for Pix data and returns the response.
 *
 * @param {Request} req - { inicio: string, fim: string}.
 * @param {Response} res - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}.
 */
export const VERIFIQUEbyId = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const request = await PixService.GET(data);
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
