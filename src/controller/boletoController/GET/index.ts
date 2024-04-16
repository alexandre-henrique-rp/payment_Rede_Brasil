import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


export const BoletoGET = async (req: Request, res: Response) => {
  try {
    const request = await BoletoService.GET();
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
