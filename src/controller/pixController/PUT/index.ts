import { Request, Response } from 'express';
import PUTService from '../../../service/pix';


/**
 * Handles the PUT request for the Pix API.
 *
 * @param {Request} req - params :uuid
 * @param {Response} res -  { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }
 */
export const PixPUT = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const request = await PUTService.PUT(uuid);
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
