import { Request, Response } from 'express';
import GETdyIdService from '../../../service/pix';


export const PixGETdyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await GETdyIdService.GETdyId(Number(id));
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
