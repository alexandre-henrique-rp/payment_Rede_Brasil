import { Request, Response } from 'express';
import LinkService from '../../../service/link';

/**
 * Retrieves a link using a GET request.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a Promise that resolves when the link is retrieved successfully, and rejects with an error otherwise
 */
export const LinkGET = async (req: Request, res: Response) => {
  try {
    const request = await LinkService.GET()
    return res.status(200).json(request)
  } catch (error) {
    return res.status(500).json(error)
  }
}
