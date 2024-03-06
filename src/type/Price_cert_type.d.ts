

/**
 * Description placeholder
 * @date 04/03/2024 - 15:33:38
 *
 * @export
 * @interface GetTypeCert
 * 
 * @property {string} Uuid
 * @property {number} FcwebId
 * @property {Date} Date_int
 * @property {string} Status_pg
 * @property {boolean} Cliente_acess
 * @property {Date} Date_venc
 * @property {string} Parcelas
 * @property {string} TxidPix
 * @property {string} TxidBoleto
 * @property {string} TxidCartao
 * @property {string} QrLink
 * @property {string} QrBase64
 * @property {Date} CreatePixDate
 * @property {string} PixStatus
 * @property {string} PixCopiaEC
 * @property {string} BarCode
 * @property {string} LinkBolix
 * @property {string} LinkBoleto
 * @property {string} Card_Adm
 * @property {string} payment_to
 * @property {string} payment_ur
 * @property {string} UrlPg
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {boolean} Pix
 * @property {boolean} Boleto
 * @property {boolean} Cartao
 * @returns {GetTypeCert} - {Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess,  Date_venc,  Parcelas,  TxidPix,  TxidBoleto,  TxidCartao,  QrLink,  QrBase64,  CreatePixDate,  PixStatus,  PixCopiaEC,  BarCode,  LinkBolix,  LinkBoleto,  Card_Adm,  payment_to,  payment_ur,  UrlPg,  createdAt,  updatedAt, Pix,  Boleto,  Cartao}
 */
export interface GetTypeCert {
  Uuid: string;
  FcwebId: number;
  Date_int?: date;
  Status_pg: string;
  Cliente_acess: boolean;
  Date_venc?: date;
  Parcelas?: string;
  TxidPix?: string;
  TxidBoleto?: string;
  TxidCartao?: string;
  QrLink?: string;
  QrBase64?: string;
  CreatePixDate?: date;
  PixStatus?: string;
  PixCopiaEC?: string;
  BarCode?: string;
  LinkBolix?: string;
  LinkBoleto?: string;
  Card_Adm?: string;
  payment_to?: string;
  payment_ur?: string;
  UrlPg?: string;
  createdAt: date;
  updatedAt?: Date
  Pix?: boolean;
  Boleto?: boolean;
  Cartao?: boolean;
}


/**
 * Description placeholder
 * @date 05/03/2024 - 12:10:45
 *
 * @export
 * @interface GetAllPriceCert
 * @typedef {GetAllPriceCert}
 * @property {GetTypeCert[]} data
 * @property {number} count
 * @returns {data: GetTypeCert[], count: number}
 */
export interface GetAllPriceCert {
  data: GetTypeCert[];
  count: number;
}


/**
 * Description placeholder
 * @date 05/03/2024 - 13:25:45
 *
 * @export
 * @interface DeletePriceCert
 * @typedef {DeletePriceCert}
 * @property {string} message
 * @property {string | number} Reference
 * @returns {message: string, Reference: string | number}
 */
export interface DeletePriceCert {
  message: string
  Reference: string | number;
}