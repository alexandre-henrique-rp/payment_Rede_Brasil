"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a boleto payment using the provided data.
 *
 * @param {any} dados -
 * @example
 * const dadosPf: DadosCreateBoleto = {
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
 *   tipocd: string;
 *   valorcd: number;
 }
 *
 *const dadosPj: DadosCreateBoleto = {
 *   expira: string;
 *   email: string;
 *   cnpj?: string;
 *   razao?: string;
 *   cel: string;
 *   cep: string;
 *   rua?: string;
 *   bairro?: string;
 *   numero?: string;
 *   complemento?: string;
 *   uf?: string;
 *   cidade?: string;
 *   tipocd: string;
 *   valorcd: number;
 }
 * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
 */
async function CepApi(pesquisa) {
    try {
        const request = await fetch(`https://viacep.com.br/ws/${StringPesquisa(pesquisa)}/json/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.default = CepApi;
function StringPesquisa(pesquisa) {
    const valor = pesquisa.replace(/[' ']/g, '/');
    return valor;
}
