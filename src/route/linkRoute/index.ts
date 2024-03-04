import express from 'express';
import linkController from '../../controller/linkController';

const LinkRouter = express.Router();

LinkRouter.get('/', linkController.LinkGET);
LinkRouter.get('/:id', linkController.LinkGETdyId);
LinkRouter.post('/', linkController.LinkPOST);
LinkRouter.put('/update/:id', linkController.LinkPUT);
LinkRouter.delete('/delete/:id', linkController.LinkDELETE);

export default LinkRouter;
