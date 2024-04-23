"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boletoController_1 = __importDefault(require("../../controller/boletoController"));
const BoletoRouter = express_1.default.Router();
/**
 * @description Retorna um Boleto pelo id
 * @path /:id
 * @method GET
 * @returns {Promise<any>} - {}
*/
BoletoRouter.get('/:uuid', boletoController_1.default.BoletoGETdyId);
/**
 * @description Cria um Boleto
 * @path /:uuid
 * @method POST
 * @returns {Promise<any>} - {}
*/
BoletoRouter.post('/:uuid', boletoController_1.default.BoletoPOSTUuid);
/**
 * @description Cria um Boleto
 * @path /
 * @method POST
 * @returns {Promise<any>} - {}
*/
BoletoRouter.post('/', boletoController_1.default.BoletoPOST);
/**
 * @description Atualiza um Boleto pelo id
 * @path /update/:id
 * @method PUT
 * @returns {Promise<any>} - {}
*/
BoletoRouter.put('/update/:uuid', boletoController_1.default.BoletoPUT);
/**
 * @description Exclui um Boleto pelo id
 * @path /delete/:id
 * @method DELETE
 * @returns {Promise<any>} - {}
*/
BoletoRouter.delete('/delete/:uuid', boletoController_1.default.BoletoDELETE);
exports.default = BoletoRouter;
