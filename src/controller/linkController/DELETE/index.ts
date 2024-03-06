import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * Asynchronous function that handles the deletion of a link.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} Promise that resolves when the deletion is successful
 */
export const LinkDELETE = async (req: Request, res: Response): Promise<any> => {
  try {
    const { uudi } = req.params
    const request = await LinkService.DELETE(uudi)
    return res.status(201).json(request)
  } catch (error: any) {
    return res.status(500).json(error)
  }
}
