import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * An asynchronous function that handles the GET request for a specific link by its ID.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} a JSON response with the requested link data or an error message
 */
export const LinkGETdyId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { uuid } = req.params
    const request = await LinkService.GETdyId(uuid)
    return res.status(200).json(request)
  } catch (error: any) {
    return res.status(500).json(error)
  }
}
