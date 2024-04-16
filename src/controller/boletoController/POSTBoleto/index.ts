import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


export const BoletoPOSTUuid = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const request = await BoletoService.POSTUuid(body);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
