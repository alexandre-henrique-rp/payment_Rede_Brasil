import { Request, Response } from 'express';
import POSTService from '../../../service/pix';


export const PixPOST = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const request = await POSTService.POST(body);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
