import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';

/**
 * 
 * @param req {uuid}
 * @param res any
 */
export const BoletoPOSTUuid = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const request = await BoletoService.POSTUuid(uuid);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
