import { Request, Response } from 'express';
import { GetTypeCert } from '../../../type/Price_cert_type';
import PixService from '../../../service/pix';

/**
 * 
 * @param {Request} req - {uuid: string}
 * @param {Response} res 
 * @template {GetTypeCert} - res.json({Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao})
 */
export const PixGETdyId = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const request: GetTypeCert = await PixService.GETdyId(uuid);
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor', erro: error });
  }
};
