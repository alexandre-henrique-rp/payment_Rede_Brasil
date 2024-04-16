
import { BoletoGET } from './GET';
import { BoletoGETdyId } from './GETdyId';
import { BoletoPOST } from './POST';
import { BoletoPUT } from './PUT';
import { BoletoDELETE } from './DELETE';
import { BoletoPOSTUuid } from './POSTBoleto';

const boletoController = {
  BoletoPOSTUuid,
  BoletoGET,
  BoletoGETdyId,
  BoletoPOST,
  BoletoPUT,
  BoletoDELETE,
};

export default boletoController;
