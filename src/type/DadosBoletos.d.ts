/**
 * Defines the interface for the DadosCreateBoleto object.
 * @interface
 * @example
 * const dados: DadosCreateBoleto = {
 *   expira: string;
 *   nome?: string;
 *   email: string;
 *   cpf?: string;
 *   nasc: string;
 *   cel: string;
 *   cep: string;
 *   rua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   razao?: string;
 *   cnpj?: string;
 *   tipocd: string;
 *   item_name: string;
 *   item_valor: number;
 *   item_quantidade: number;
 }
 *
 */
export interface DadosCreateBoleto {
  expira: string;
  nome?: string;
  email: string;
  cpf?: string;
  nasc: string;
  cel: string;
  cep: string;
  rua?: string;
  bairro?: string;
  numero?: string;
  complemento?: string;
  uf?: string;
  cidade?: string;
  razao?: string;
  cnpj?: string;
  tipocd: string;
  item_name?: string;
  item_valor?: number;
  item_quantidade?: number;
}

/**
 * Defines the interface for the RespostaBoleto object.
 * @interface
 * @example
 * {
 *   code: number; // retorno HTTP "200" informando que o pedido foi bem sucedido
 *   data: {
 *     barcode: string; // linha digitável do boleto
 *     pix: {
 *       qrcode: string; // BRCode ou copia e cola
 *       qrcode_image: string; // QR Code imagem
 *     };
 *     link: string; // link responsivo do Bolix gerado
 *     billet_link: string; // link do Bolix gerado
 *     pdf: {
 *       charge: string; // link do PDF do Bolix
 *     };
 *     expire_at: string; // data de vencimento do boleto no seguinte formato: 2022-12-15 (ou seja, equivale a 15/12/2022)
 *     charge_id: number; // número da ID referente à transação gerada
 *     status: string; // forma de pagamento selecionada, aguardando a confirmação do pagamento ("waiting" equivale a aguardando)
 *     total: number; // valor, em centavos. Por exemplo: 5990 (equivale a R$ 59,90)
 *     payment: string; // forma de pagamento associada à esta transação ("banking_billet" equivale a "boleto bancário")
 }
 */
export interface RespostaBoleto {
  code: number;
  data: {
    barcode: string;
    pix: {
      qrcode: string;
      qrcode_image: string;
    };
    link: string;
    billet_link: string;
    pdf: {
      charge: string;
    };
    expire_at: string;
    charge_id: number;
    status: string; 
    total: number; 
    payment: string;
  };
}

/**
 * Defines the interface for the DadosUpdateBoleto object.
 * @interface
 * @example
 * {
 *   expira: string;
 *   IdPayment: number;
 }
 *
 */
 export interface DadosUpdateBoleto {
  expira: string;
  IdPayment: number;
}

/**
 * Defines the interface for the DadosCancelBoleto object.
 * @interface
 * @typeparam {number} IdPayment
 * @example
 * {
 *   IdPayment: number;
 * }
 */
export interface DadosCancelBoleto {
  IdPayment: number;
}