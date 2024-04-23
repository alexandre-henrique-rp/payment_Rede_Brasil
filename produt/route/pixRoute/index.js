"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pixController_1 = __importDefault(require("../../controller/pixController"));
const PixRouter = express_1.default.Router();
/**
 * @description POST /list
 * @param {any} data - {inicio: string, fim: string}
 * @returns {Promise<any>} - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}
*/
PixRouter.post('/list', pixController_1.default.PixGET);
/**
 * @description GET /pix/:uuid
 * @param {string} uuid
 * @returns {Promise<GetTypeCert>} - {Uuid, FcwebId, Date_int, Status_pg, Cliente_acess, Date_venc, Parcelas, TxidPix, TxidBoleto, TxidCartao, QrLink, QrBase64, CreatePixDate, PixStatus, PixCopiaEC, BarCode, LinkBolix, LinkBoleto, Card_Adm, payment_to, payment_ur, UrlPg, createdAt, updatedAt, Pix, Boleto, Cartao}
*/
PixRouter.get('/:uuid', pixController_1.default.PixGETdyId);
PixRouter.get('/verifique/pg', pixController_1.default.VERIFIQUE);
// PixRouter.get('/verifique/:uuid', pixController.PixGETdyId);
/**
 * @description POST /pix
 * @param {any} data - {uuid: string}
 * @return {Promise<PixTypeResp>} - {Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode}
 */
PixRouter.post('/', pixController_1.default.PixPOST);
/**
 * @description PUT /pix/update/:uuid
 * @param {string} uuid
 * @return {Promise<PixTypeResp>} - { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }
 */
PixRouter.put('/update/:uuid', pixController_1.default.PixPUT);
/**
 * @description DELETE /pix/delete/:uuid
 * @param {string} uuid
 * @return {Promise<string>} - res.send('Pagamento uuid: ' + uuid + ' - deletado com sucesso');
 */
PixRouter.delete('/delete/:uuid', pixController_1.default.PixDELETE);
exports.default = PixRouter;
