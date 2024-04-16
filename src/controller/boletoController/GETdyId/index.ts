import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


export const BoletoGETdyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await BoletoService.GETdyId(Number(id));
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
