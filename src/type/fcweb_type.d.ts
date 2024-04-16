/**
 * Defines the interface for the GetFcweb object.
 * @interface
 * @example
 * {
 *   id: number;
 *   s_alerta?: string;
 *   referencia?: string;
 *   id_boleto?: string;
 *   id_cancelar_bol_rem?: string;
 *   unidade?: string;
 *   responsavel?: string;
 *   criou_fc?: string;
 *   andamento?: string;
 *   prioridade?: string;
 *   solicitacao?: string;
 *   filial?: string;
 *   cpf?: string;
 *   cnpj?: string;
 *   nome?: string;
 *   razaosocial?: string;
 *   vectoboleto?: Date;
 *   unico?: string;
 *   contador?: string;
 *   obscont?: string;
 *   comissaoparceiro?: number;
 *   scp?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 *   custocd?: string;
 *   custoCdpar?: string;
 *   estatos_pgto?: string;
 *   pgto_efi?: string;
 *   formapgto?: string;
 *   vouchersoluti?: string;
 *   ct_parcela?: string;
 *   telefone?: string;
 *   telefone2?: string;
 *   email?: string;
 *   dtnascimento?: string;
 *   rg?: string;
 *   cei?: string;
 *   endereco?: string;
 *   nrua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   cep?: string;
 *   razao?: string;
 *   cnpj?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 * }
 */
export interface GetFcweb {
  id: number;
  s_alerta?: string;
  referencia?: string;
  id_boleto?: string;
  id_cancelar_bol_rem?: string;
  unidade?: string;
  responsavel?: string;
  criou_fc?: string;
  andamento?: string;
  prioridade?: string;
  solicitacao?: string;
  venda?: string;
  cpf?: string;
  cnpj?: string;
  nome?: string;
  razaosocial?: string;
  vectoboleto?: Date;
  unico?: string;
  contador?: string;
  obscont?: string;
  comissaoparceiro?: number;
  scp?: string;
  tipocd?: string;
  valorcd?: string;
  custocd?: string;
  custoCdpar?: string;
  estatos_pgto?: string;
  pgto_efi?: string;
  formapgto?: string;
  vouchersoluti?: string;
  ct_parcela?: string;
  telefone?: string;
  telefone2?: string;
  email?: string;
  dtnascimento?: string;
  rg?: string;
  cei?: string;
  endereco?: string;
  nrua?: string;
  bairro?: string;
  complemento?: string;
  cep?: string;
  uf?: string;
  im?: number;
  cidade?: string;
  observacao?: string;
  vctoCD?: Date;
  historico?: string;
  arquivo?: string;
  nomearquivo?: string;
  obsrenovacao?: string;
  dt_aprovacao?: Date;
  comicao?: number;
  validacao?: string;
  nfe?: string;
  urlnota?: string;
  id_fcw_soluti?: string;
  dt_agenda?: Date;
  hr_agenda?: Date;
  obs_agenda?: string;
  reg_cnh?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Defines the interface for the GetFcweb object.
 * @interface
 * @example
 * {
 *   s_alerta?: string;
 *   referencia?: string;
 *   id_boleto?: string;
 *   id_cancelar_bol_rem?: string;
 *   unidade?: string;
 *   responsavel?: string;
 *   criou_fc?: string;
 *   andamento?: string;
 *   prioridade?: string;
 *   solicitacao?: string;
 *   filial?: string;
 *   cpf?: string;
 *   cnpj?: string;
 *   nome?: string;
 *   razaosocial?: string;
 *   vectoboleto?: Date;
 *   unico?: string;
 *   contador?: string;
 *   obscont?: string;
 *   comissaoparceiro?: number;
 *   scp?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 *   custocd?: string;
 *   custoCdpar?: string;
 *   estatos_pgto?: string;
 *   pgto_efi?: string;
 *   formapgto?: string;
 *   vouchersoluti?: string;
 *   ct_parcela?: string;
 *   telefone?: string;
 *   telefone2?: string;
 *   email?: string;
 *   dtnascimento?: string;
 *   rg?: string;
 *   cei?: string;
 *   endereco?: string;
 *   nrua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   cep?: string;
 *   razao?: string;
 *   cnpj?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 * }
 */
 export interface UpdateFcweb {
  s_alerta?: string;
  referencia?: string;
  id_boleto?: string;
  id_cancelar_bol_rem?: string;
  unidade?: string;
  responsavel?: string;
  criou_fc?: string;
  andamento?: string;
  prioridade?: string;
  solicitacao?: string;
  venda?: string;
  cpf?: string;
  cnpj?: string;
  nome?: string;
  razaosocial?: string;
  vectoboleto?: Date;
  unico?: string;
  contador?: string;
  obscont?: string;
  comissaoparceiro?: number;
  scp?: string;
  tipocd?: string;
  valorcd?: string;
  custocd?: string;
  custoCdpar?: string;
  estatos_pgto?: string;
  pgto_efi?: string;
  formapgto?: string;
  vouchersoluti?: string;
  ct_parcela?: string;
  telefone?: string;
  telefone2?: string;
  email?: string;
  dtnascimento?: string;
  rg?: string;
  cei?: string;
  endereco?: string;
  nrua?: string;
  bairro?: string;
  complemento?: string;
  cep?: string;
  uf?: string;
  im?: number;
  cidade?: string;
  observacao?: string;
  vctoCD?: Date;
  historico?: string;
  arquivo?: string;
  nomearquivo?: string;
  obsrenovacao?: string;
  dt_aprovacao?: Date;
  comicao?: number;
  validacao?: string;
  nfe?: string;
  urlnota?: string;
  id_fcw_soluti?: string;
  dt_agenda?: Date;
  hr_agenda?: Date;
  obs_agenda?: string;
  reg_cnh?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


/**
 * Defines the interface for the GetAllFcweb object.
 * @interface
 * @example
 * {
 *   data: [
 * {
 * id: number;
 *   s_alerta?: string;
 *   referencia?: string;
 *   id_boleto?: string;
 *   id_cancelar_bol_rem?: string;
 *   unidade?: string;
 *   responsavel?: string;
 *   criou_fc?: string;
 *   andamento?: string;
 *   prioridade?: string;
 *   solicitacao?: string;
 *   filial?: string;
 *   cpf?: string;
 *   cnpj?: string;
 *   nome?: string;
 *   razaosocial?: string;
 *   vectoboleto?: Date;
 *   unico?: string;
 *   contador?: string;
 *   obscont?: string;
 *   comissaoparceiro?: number;
 *   scp?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 *   custocd?: string;
 *   custoCdpar?: string;
 *   estatos_pgto?: string;
 *   pgto_efi?: string;
 *   formapgto?: string;
 *   vouchersoluti?: string;
 *   ct_parcela?: string;
 *   telefone?: string;
 *   telefone2?: string;
 *   email?: string;
 *   dtnascimento?: string;
 *   rg?: string;
 *   cei?: string;
 *   endereco?: string;
 *   nrua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   cep?: string;
 *   razao?: string;
 *   cnpj?: string;
 *   tipocd?: string;
 *   valorcd?: string;
 *   pix?: string;
 * }
 * ];
 *   count: number;
 * }
 */
export interface GetAllFcweb {
  data: GetFcweb[];
  count: number;
}

/**
 * Defines the interface for the DeleteFcweb object.
 * @interface
 * @example
 * {
 *   message: string;
 *   Reference: string | number;
 * }
 */
export interface DeleteFcweb {
  message: string;
  Reference: string | number;
}
