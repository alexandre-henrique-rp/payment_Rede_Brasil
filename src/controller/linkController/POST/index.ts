import { Request, Response } from 'express';
import LinkService from '../../../service/link';


/**
 * A function that handles a POST request for a link.
 *
 * @param {Request} req - the request object
 * @body {Request}
 * @param {Response} res - the response object
 * @return {Promise<any>} Promise that resolves to void
 */
export const LinkPOST = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req
    console.log(body)
    const request = await LinkService.POST(body)
    return res.status(201).json(request)
  } catch (error: any) {
    return res.status(500).json(error)
  }
}
