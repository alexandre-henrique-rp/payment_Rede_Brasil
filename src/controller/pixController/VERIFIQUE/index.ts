import { Request, Response } from 'express';
import PixService from '../../../service/pix';


export const VERIFIQUE = async (req: Request, res: Response) => {
  try {
    console.log('verifique');
    const request = await PixService.pixVerifique();
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
