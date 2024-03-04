import { Request, Response } from 'express';
import GETService from '../../../service/pix';


export const PixGET = async (req: Request, res: Response) => {
  try {
    const request = await GETService.GET();
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
