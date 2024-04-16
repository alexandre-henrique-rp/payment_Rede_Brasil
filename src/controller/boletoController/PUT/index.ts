import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


export const BoletoPUT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const request = await BoletoService.PUT(Number(id), body);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
