import express from 'express';
import linkController from '../../controller/linkController';

const LinkRouter = express.Router();

LinkRouter.get('/', linkController.LinkGET);
LinkRouter.get('/:uuid', linkController.LinkGETdyId);
LinkRouter.post('/', linkController.LinkPOST);
LinkRouter.put('/update/:uuid', linkController.LinkPUT);
LinkRouter.delete('/delete/:uuid', linkController.LinkDELETE);

export default LinkRouter;
