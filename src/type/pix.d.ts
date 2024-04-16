/***
 * @interface PixEfi
 * @typedef {PixEfi}
 * 
 * @property {string} txid
 * @property {object} calendario - { criacao: string, expiracao: number }
 * @property {number} revisao 
 * @property {object} devedor - { nome: string, cpf: string }
 * @property {object} valor - { original: string }
 * @property {string} chave
 * @property {string} status
 * @property {object} loc - { id: number, location: string, tipoCob: string, criacao: string }
 * @property {string} location
 * @property {string} pixCopiaECola
 * 
 */
export interface PixEfi {
  txid: string;
  calendario: {
    criacao: string;
    expiracao: number;
  };
  revisao: number;
  devedor: {
    nome: string;
    cpf: string;
  };
  valor: {
    original: string;
  };
  chave: string;
  status: string;
  loc: {
    id: number
    location: string;
    tipoCob: string;
    criacao: string;
  };
  location: string;
  pixCopiaECola: string;
  pix?: [
    {
      endToEndId: string;
      txid: string;
      valor: string;
      chave: string;
      horario: string;
      infoPagador: string;
    }
  ]
}

/***
 * @interface QrCodePixType
 * @typedef {QrCodePixType}
 * 
 * @property {string} qrcode
 * @property {string} imagemQrcode
 * @property {string} linkVisualizacao
 */
export interface QrCodePixType {
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}