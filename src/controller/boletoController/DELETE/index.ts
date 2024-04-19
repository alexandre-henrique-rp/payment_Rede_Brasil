import { Request, Response } from 'express';
import BoletoService from '../../../service/boleto';


export const BoletoDELETE = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const request = await BoletoService.DELETE(uuid);
    res.status(204).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
