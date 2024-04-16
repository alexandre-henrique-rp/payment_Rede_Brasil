/**
 * Description placeholder
 *
 * @interface
 * @example
 * {
 *   Uuid: string;
 *   FcwebId: number;
 *   Date_int?: Date|string;
 *   Status_pg: string;
 *   Cliente_acess: boolean;
 *   Date_venc?: Date|string;
 *   Parcelas?: string;
 *   TxidPix?: string;
 *   TxidBoleto?: number;
 *   TxidCartao?: string;
 *   QrLink?: string;
 *   QrBase64?: string;
 *   CreatePixDate?: Date|string;
 *   PixStatus?: string;
 *   PixCopiaEC?: string;
 *   BarCode?: string;
 *   LinkBolix?: string;
 *   LinkBoleto?: string;
 *   Card_Adm?: string;
 *   payment_to?: string;
 *   payment_ur?: string;
 *   UrlPg?: string;
 *   createdAt: Date|string;
 *   updatedAt?: Date|string;
 *   Pix?: boolean;
 *   Boleto?: boolean;
 *   Cartao?: boolean;
 * }
 *
 */
export interface GetTypeCert {
  Uuid: string;
  FcwebId: number;
  Date_int?: Date|string;
  Status_pg: string;
  Cliente_acess: boolean;
  Date_venc?: Date|string;
  Parcelas?: string;
  TxidPix?: string;
  TxidBoleto?: number | string;
  TxidCartao?: string;
  QrLink?: string;
  QrBase64?: string;
  CreatePixDate?: Date|string;
  PixStatus?: string;
  PixCopiaEC?: string;
  BarCode?: string;
  LinkBolix?: string;
  LinkBoleto?: string;
  LinkBoletoPdf?: string;
  Card_Adm?: string;
  payment_to?: string;
  payment_ur?: string;
  UrlPg?: string;
  createdAt: Date|string;
  updatedAt?: Date|string;
  Pix?: boolean;
  Boleto?: boolean;
  Cartao?: boolean;
}

/**
 * Description placeholder
 * @date 04/03/2024 - 15:33:38
 *
 * @interface
 * @example
 * {
 *   Uuid: string;
 *   FcwebId: number;
 *   Status_pg: string;
 *   UrlPg?: string;
 *   Pix?: boolean;
 *   Boleto?: boolean;
 *   Cartao?: boolean;
 * }
 *
 */
export interface GetTypeCertMin {
  Uuid: string;
  FcwebId: number;
  Status_pg: string;
  UrlPg?: string;
  Pix?: boolean;
  Boleto?: boolean;
  Cartao?: boolean;
}

/**
 * Description placeholder
 *
 * @interface
 * @example
 * {
 *   data: [
 *    {
 *      Uuid,
 *      FcwebId,
 *      Status_pg,
 *      UrlPg, Pix,
 *      Boleto,
 *      Cartao
 *    }
 * ];
 *   count: number
 * }

*/
export interface GetAllPriceCert {
  data: GetTypeCertMin[];
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
  message: string;
  Reference: string | number;
}

/**
 * Defines the interface for the UpdateTypeCert object.
 * @interface
 * @example
 * {
 *   Date_int?: Date|string;
 *   Status_pg: string;
 *   Cliente_acess: boolean;
 *   Date_venc?: Date|string;
 *   Parcelas?: string;
 *   TxidPix?: string;
 *   TxidBoleto?: number;
 *   TxidCartao?: string;
 *   QrLink?: string;
 *   QrBase64?: string;
 *   CreatePixDate?: Date|string;
 *   PixStatus?: string;
 *   PixCopiaEC?: string;
 *   BarCode?: string;
 *   LinkBolix?: string;
 *   LinkBoleto?: string;
 *   LinkBoletoPdf?: string;
 *   Card_Adm?: string;
 *   payment_to?: string;
 *   payment_ur?: string;
 *   UrlPg?: string;
 *   createdAt: Date|string;
 *   updatedAt?: Date|string;
 *   Pix?: boolean;
 *   Boleto?: boolean;
 *   Cartao?: boolean;
 * }
 */
export interface UpdateTypeCert {
  Date_int?: Date|string;
  Status_pg?: string;
  Cliente_acess?: boolean;
  Date_venc?: Date|string;
  Parcelas?: string;
  TxidPix?: string;
  TxidBoleto?: number;
  TxidCartao?: string;
  QrLink?: string;
  QrBase64?: string;
  CreatePixDate?: Date|string;
  PixStatus?: string;
  PixCopiaEC?: string;
  BarCode?: string;
  LinkBolix?: string;
  LinkBoleto?: string;
  LinkBoletoPdf?: string;
  Card_Adm?: string;
  payment_to?: string;
  payment_ur?: string;
  UrlPg?: string;
  Pix?: boolean;
  Boleto?: boolean;
  Cartao?: boolean;
}
