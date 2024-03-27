import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * Retrieves a link using a GET request.
 *
 * @param {Request} req - the request object
 * @param {Response} res - {data:[{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess, UrlPg, Pix,  Boleto,  Cartao}, ...], count: number}
 */
export const LinkGET = async (req: Request, res: Response): Promise<any> => {
  try {
    const request = await LinkService.GET();
    return res.status(200).json(request);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

