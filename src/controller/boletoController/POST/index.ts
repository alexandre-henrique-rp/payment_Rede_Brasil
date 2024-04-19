import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


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
export const BoletoPOST = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const request = await BoletoService.POST(data);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
