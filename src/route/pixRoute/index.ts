import express from 'express';
import pixController from '../../controller/pixController';

const PixRouter = express.Router();

PixRouter.get('/', pixController.PixGET);
PixRouter.get('/:id', pixController.PixGETdyId);
PixRouter.post('/', pixController.PixPOST);
PixRouter.put('/update/:id', pixController.PixPUT);
PixRouter.delete('/delete/:id', pixController.PixDELETE);

export default PixRouter;
