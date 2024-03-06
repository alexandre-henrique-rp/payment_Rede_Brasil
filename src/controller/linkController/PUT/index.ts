import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * Updates a link using the provided UUID and request body.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} Promise that resolves to any
 */
export const LinkPUT = async (req: Request, res: Response): Promise<any> => {
  try {
    const { uuid } = req.params
    const { body } = req
    const request = await LinkService.PUT(uuid, body)
    return res.status(200).json(request)
  } catch (error: any) {
    return res.status(500).json(error)
  }
}
