import express from 'express';
import boletoController from '../../controller/boletoController';

const BoletoRouter = express.Router();


/** 
 * @description Retorna um Boleto pelo id
 * @path /:id
 * @method GET
 * @returns {Promise<any>} - {}
*/
BoletoRouter.get('/:uuid', boletoController.BoletoGETdyId);

/** 
 * @description Cria um Boleto
 * @path /:uuid
 * @method POST
 * @returns {Promise<any>} - {}
*/
BoletoRouter.post('/:uuid', boletoController.BoletoPOSTUuid);

/** 
 * @description Cria um Boleto
 * @path /
 * @method POST
 * @returns {Promise<any>} - {}
*/
BoletoRouter.post('/', boletoController.BoletoPOST);

/** 
 * @description Atualiza um Boleto pelo id
 * @path /update/:id
 * @method PUT
 * @returns {Promise<any>} - {}
*/
BoletoRouter.put('/update/:uuid', boletoController.BoletoPUT);

/** 
 * @description Exclui um Boleto pelo id
 * @path /delete/:id
 * @method DELETE
 * @returns {Promise<any>} - {}
*/
BoletoRouter.delete('/delete/:uuid', boletoController.BoletoDELETE);

export default BoletoRouter;
