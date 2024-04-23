"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linkController_1 = __importDefault(require("../../controller/linkController"));
const LinkRouter = express_1.default.Router();
/**
 * @description listar todos os links
 * @path /
 * @method GET
 * @returns {Promise<any>} - {data:[{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess, UrlPg, Pix,  Boleto,  Cartao}, ...], count: number}
*/
LinkRouter.get('/', linkController_1.default.LinkGET);
/**
 * @description ler link por Uuid
 * @path /:uuid
 * @method GET
 * @param {string} uuid
 * @returns {Promise<any>} - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 */
LinkRouter.get('/:uuid', linkController_1.default.LinkGETdyId);
/**
 * @description Criar link
 * @path /
 * @method POST
 * @body - {uuid: string}
 * @return {Promise<any>} - {Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix}
 */
LinkRouter.post('/', linkController_1.default.LinkPOST);
/**
 * @description Atualização de link
 * @path /update/:uuid
 * @method PUT
 * @param {string} uuid
 * @body - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 * @return {Promise<any>} - { Uuid,FcwebId,Date_int,Status_pg,Cliente_acess,Date_venc,Parcelas,TxidPix,TxidBoleto,TxidCartao,QrLink,QrBase64,CreatePixDate,PixStatus,PixCopiaECola,BarCode,LinkBolix,LinkBoleto,LinkBoletoPdf,Card_Adm,payment_token,payment_url,UrlPg ,createdAt,updatedAt,Boleto,Cartao,Pix }
 */
LinkRouter.put('/update/:uuid', linkController_1.default.LinkPUT);
/**
 * @description Deletar link
 * @path /delete/:uuid
 * @method DELETE
 * @param {string} uuid
 * @return {Promise<any>} - {res.send('Link uuid: ' + uuid + ' - deletado com sucesso')}
 */
LinkRouter.delete('/delete/:uuid', linkController_1.default.LinkDELETE);
exports.default = LinkRouter;
