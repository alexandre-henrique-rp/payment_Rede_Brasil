import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * A function that handles a POST request for a link.
 *
 * @param {Request} req - the request object
 * @body {Request}
 * @param {Response} res - the response object
 */
export const LinkPOST = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const BaseUrl = process.env.BASE_URL_PAYMENT;
    const request = await LinkService.POST(body);
    const data = { UrlPg: `${BaseUrl}/${request.Uuid}` };
    const update = await LinkService.PUT(request.Uuid, data);
    return res.status(201).json(update);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};
