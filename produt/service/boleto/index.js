"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const GetByUuid_1 = require("../../Lib/link/GetByUuid");
const GetById_1 = require("../../Lib/Cliente/GetById");
const create_payment_1 = __importDefault(require("../../integration/boleto/create_payment"));
const cep_1 = __importDefault(require("../../integration/cep"));
const cancel_payment_1 = __importDefault(require("../../integration/boleto/cancel_payment"));
const update_vencimento_1 = __importDefault(require("../../integration/boleto/update_vencimento"));
const get_by_id_payment_1 = __importDefault(require("../../integration/boleto/get_by_id_payment"));
const prisma = new client_1.PrismaClient();
const BoletoService = {
    /**
     *
     * @param uuid
     * @returns {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
     */
    async GETdyId(uuid) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(uuid);
            const id = Number(requestLink.TxidBoleto);
            const boleto = await (0, get_by_id_payment_1.default)(id);
            return boleto;
        }
        catch (error) {
            console.error('Erro ao buscar registro por UUID:', error);
            throw error;
        }
    },
    /**
     *
     * @param data
     * @example
     * {
     *   id: any;
     *   expira: string;
     *   nome: string;
     *   email: string;
     *   cpf: string;
     *   dtnascimento: string;
     *   cep: string;
     *   razaosocial: string;
     *   cnpj: string;
     *   telefone: string;
     *   nrua: string;
     }
     * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
     */
    async POST(data) {
        try {
            const id = Number(data.id);
            const requestLink = await prisma.price_cert.create({
                data: {
                    FcwebId: id,
                    Status_pg: 'Falta pagamento',
                    Date_int: new Date().toISOString(),
                },
            });
            const requestClient = await (0, GetById_1.GetFcwebLib)(id);
            const DadosCep = await (0, cep_1.default)(data.cep);
            const dadosBoleto = {
                expira: data.expira,
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                nasc: data.dtnascimento,
                cel: data.telefone,
                cep: data.cep,
                rua: DadosCep.logradouro,
                bairro: DadosCep.bairro,
                numero: data.nrua,
                complemento: DadosCep.complemento,
                uf: DadosCep.uf,
                cidade: DadosCep.cidade,
                razao: requestClient.razaosocial,
                cnpj: requestClient.cnpj,
                tipocd: requestClient.tipocd,
                item_name: `Certificado ${requestClient.tipocd} - Valido por ${requestClient.tipocd === "A1PF" ? "1 ano" : requestClient.tipocd === "A1PJ" ? "1 ano" : "3 anos"}`,
                item_valor: ValorProd(requestClient.valorcd),
                item_quantidade: 1
            };
            const CreateBoleto = await (0, create_payment_1.default)(dadosBoleto);
            const DadosUpdate = {
                BarCode: CreateBoleto.data.barcode,
                QrBase64: CreateBoleto.data.pix.qrcode_image,
                LinkBoleto: CreateBoleto.data.billet_link,
                Date_venc: new Date(CreateBoleto.data.expire_at).toISOString(),
                LinkBoletoPdf: CreateBoleto.data.pdf.charge,
                LinkBolix: CreateBoleto.data.link,
                TxidBoleto: CreateBoleto.data.charge_id,
                Boleto: true
            };
            await prisma.price_cert.update({
                where: {
                    Uuid: requestLink.Uuid
                },
                data: DadosUpdate
            });
            return CreateBoleto;
        }
        catch (error) {
            console.error('Erro ao criar registro:', error);
            throw error;
        }
    },
    /**
     * Creates a boleto payment using the provided data.
     *
     * @param Uuid - string
     * @return {Promise<any>} - { txid, calendario, revisao, devedor, valor, chave, status, loc, pixCopiaECola }
     */
    async POSTUuid(uuid) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(uuid);
            const requestClient = await (0, GetById_1.GetFcwebLib)(requestLink.FcwebId);
            const DateAtual = new Date();
            DateAtual.setDate(DateAtual.getDate() + 5);
            const DateAltualString = DateAtual.toISOString().split('T')[0];
            const dadosBoleto = {
                expira: DateAltualString,
                nome: requestClient.nome,
                email: requestClient.email,
                cpf: requestClient.cpf,
                nasc: requestClient.dtnascimento,
                cel: requestClient.telefone,
                cep: requestClient.cep,
                rua: requestClient.endereco,
                bairro: requestClient.bairro,
                numero: requestClient.nrua,
                complemento: requestClient.complemento,
                uf: requestClient.uf,
                cidade: requestClient.cidade,
                razao: requestClient.razaosocial,
                cnpj: requestClient.cnpj,
                tipocd: requestClient.tipocd,
                item_name: `Certificado ${requestClient.tipocd} - Valido por ${requestClient.tipocd === "A1PF" ? "1 ano" : requestClient.tipocd === "A1PJ" ? "1 ano" : "3 anos"}`,
                item_valor: ValorProd(requestClient.valorcd),
                item_quantidade: 1
            };
            const CreateBoleto = await (0, create_payment_1.default)(dadosBoleto);
            const DadosUpdate = {
                BarCode: CreateBoleto.data.barcode,
                QrBase64: CreateBoleto.data.pix.qrcode_image,
                LinkBoleto: CreateBoleto.data.billet_link,
                Date_venc: new Date(CreateBoleto.data.expire_at).toISOString(),
                LinkBoletoPdf: CreateBoleto.data.pdf.charge,
                LinkBolix: CreateBoleto.data.link,
                TxidBoleto: CreateBoleto.data.charge_id,
                Boleto: true
            };
            await prisma.price_cert.update({
                where: {
                    Uuid: uuid
                },
                data: DadosUpdate
            });
            return CreateBoleto;
        }
        catch (error) {
            console.error('Erro ao criar registro:', error);
            throw error;
        }
    },
    /**
     *
     * @param uuid
     * @param data
     * @example
     * {
     *   expira: string;
     * }
     * @returns
     */
    async PUT(uuid, data) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(uuid);
            const id = Number(requestLink.TxidBoleto);
            const dataBanco = new Date(requestLink.Date_venc).toISOString().split('T')[0];
            console.log(dataBanco);
            console.log(data.expira);
            console.log(compararDatas(dataBanco, data.expira));
            const UpdateBoleto = await (0, update_vencimento_1.default)({
                IdPayment: id,
                expira: data.expira
            });
            const DadosUpdate = {
                Date_venc: `${data.expira}T00:00:00.000Z`,
            };
            await prisma.price_cert.update({
                where: {
                    Uuid: uuid
                },
                data: DadosUpdate
            });
            const DataVenc = data.expira.split('-');
            return Object.assign(Object.assign({}, UpdateBoleto), { expira: data.expira, mesage: `Boleto atualizado com sucesso! Vencimento: ${DataVenc[2]}/${DataVenc[1]}/${DataVenc[0]}` });
        }
        catch (error) {
            console.error('Erro ao editar registro:', error);
            throw error;
        }
    },
    /**
     *
     * @param uuid
     * @returns
     */
    async DELETE(uuid) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(uuid);
            const id = Number(requestLink.TxidBoleto);
            const cancel = await (0, cancel_payment_1.default)({
                IdPayment: id,
            });
            await prisma.price_cert.update({
                where: {
                    Uuid: uuid
                },
                data: {
                    Boleto: false
                }
            });
            return cancel;
        }
        catch (error) {
            console.error('Erro ao excluir registro:', error);
            throw error;
        }
    },
};
exports.default = BoletoService;
const ValorProd = (preço) => {
    const valor = preço.toString().replace(/[.,]/g, '');
    if (valor < 1) {
        throw "valor da emissão (0,00) é inferior ao limite mínimo para esta transação (0,01)";
    }
    else {
        return Number(valor);
    }
};
function compararDatas(dataBanco, dataString) {
    // Convertendo a string da data do banco para um objeto Date
    var dataBancoObj = new Date(dataBanco);
    // Convertendo a string da data fornecida para um objeto Date
    var dataFornecidaObj = new Date(dataString);
    // Comparando as datas
    if (dataBancoObj < dataFornecidaObj) {
        return "OK";
    }
    else if (dataBancoObj > dataFornecidaObj) {
        // throw new Error("A Data Fornecida é maior do que a data de vencimento atuale do Boleto.");
        throw "A Data Fornecida é maior do que a data de vencimento atuale do Boleto.";
        // return "A Data Fornecida é menor do que a data de vencimento atuale do Boleto.";
    }
    else {
        throw "A Data Fornecida é igual do que a data de vencimento atuale do Boleto.";
        // return "A Data Fornecida é igual do que a data de vencimento atuale do Boleto.";
    }
}
