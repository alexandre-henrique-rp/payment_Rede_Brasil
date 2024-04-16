import express from 'express';
import boletoController from '../../controller/boletoController';

const BoletoRouter = express.Router();

/** 
 * @description Retorna uma lista de Boletos
 * @path /
 * @method GET
 * @returns {Promise<any>} - {}
*/
BoletoRouter.get('/', boletoController.BoletoGET);

/** 
 * @description Retorna um Boleto pelo id
 * @path /:id
 * @method GET
 * @returns {Promise<any>} - {}
*/
BoletoRouter.get('/:id', boletoController.BoletoGETdyId);

/** 
 * @description Cria um Boleto
 * @path /
 * @method POST
 * @returns {Promise<any>} - {}
*/
BoletoRouter.post('/', boletoController.BoletoPOSTUuid);

/** 
 * @description Atualiza um Boleto pelo id
 * @path /update/:id
 * @method PUT
 * @returns {Promise<any>} - {}
*/
BoletoRouter.put('/update/:id', boletoController.BoletoPUT);

/** 
 * @description Exclui um Boleto pelo id
 * @path /delete/:id
 * @method DELETE
 * @returns {Promise<any>} - {}
*/
BoletoRouter.delete('/delete/:id', boletoController.BoletoDELETE);

export default BoletoRouter;
