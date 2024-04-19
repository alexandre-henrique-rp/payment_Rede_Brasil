import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


/**
 * 
 * @param req.params.uuid
 * @param res.status.json
 */
export const BoletoGETdyId = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const request = await BoletoService.GETdyId(uuid);
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
