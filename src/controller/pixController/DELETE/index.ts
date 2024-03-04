import { Request, Response } from 'express';
import DELETEService from '../../../service/pix';


export const PixDELETE = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await DELETEService.DELETE(Number(id));
    res.status(204).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
