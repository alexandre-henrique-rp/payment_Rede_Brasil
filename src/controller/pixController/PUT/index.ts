import { Request, Response } from 'express';
import PUTService from '../../../service/pix';


export const PixPUT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const request = await PUTService.PUT(Number(id), body);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
