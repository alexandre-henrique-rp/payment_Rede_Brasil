import express from 'express';
import linkController from '../../controller/linkController';

const LinkRouter = express.Router();

/** 
 * @description listar todos os links
 * @path /
 * @method GET
 * @returns {Promise<any>} - {data:[{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess, UrlPg, Pix,  Boleto,  Cartao}, ...], count: number}
*/
LinkRouter.get('/', linkController.LinkGET);

/**
 * @description ler link por Uuid
 * @path /:uuid
 * @method GET
 * @param {string} uuid
 * @returns {Promise<any>} - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 */
LinkRouter.get('/:uuid', linkController.LinkGETdyId);

/**
 * @description Criar link
 * @path /
 * @method POST
 * @body - {uuid: string}
 * @return {Promise<any>} - {Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix}
 */
LinkRouter.post('/', linkController.LinkPOST);

/**
 * @description Atualização de link
 * @path /update/:uuid
 * @method PUT
 * @param {string} uuid
 * @body - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 * @return {Promise<any>} - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 */
LinkRouter.put('/update/:uuid', linkController.LinkPUT);

/**
 * @description Deletar link
 * @path /delete/:uuid
 * @method DELETE
 * @param {string} uuid
 * @return {Promise<any>} - {res.send('Link uuid: ' + uuid + ' - deletado com sucesso')}
 */
LinkRouter.delete('/delete/:uuid', linkController.LinkDELETE);

export default LinkRouter;
