"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const GetByUuid_1 = require("../../Lib/link/GetByUuid");
const GetById_1 = require("../../Lib/Cliente/GetById");
const create_payment_1 = __importDefault(require("../../integration/pix/create_payment"));
const qrcode_1 = __importDefault(require("../../integration/pix/qrcode"));
const link_1 = __importDefault(require("../link"));
const update_payment_1 = __importDefault(require("../../integration/pix/update_payment"));
const get_by_txid_payment_1 = __importDefault(require("../../integration/pix/get_by_txid_payment"));
const list_payment_1 = __importDefault(require("../../integration/pix/list_payment"));
const prisma = new client_1.PrismaClient();
const PixService = {
    /**
     * Retrieves all prices for a given certification.
     *
     * @param {any} data - {inicio: string, fim: string}.
     * @return {Promise<any>} - {parametros: {inicio, fim, paginacao: { paginaAtual, itensPorPagina, quantidadeDePaginas, quantidadeTotalDeItens }}, cobs: [{ calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola }]}.
     */
    async GET(data) {
        try {
            const pix = await (0, list_payment_1.default)(data);
            return pix;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * A description of the entire function.
     *
     * @param {string} uuid - description of parameter
     * @return {Promise<any>} - {Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode, payment: {calendario: {criacao, expiracao}, txid, revisao: nunber, status, valor:{ original }, chave, devedor:{cpf, nome}, loc:{id, location, tipoCob, criacao}, location, pixCopiaECola}}
     */
    async GETdyId(uuid) {
        try {
            const request = await verifiquePixFunc(uuid);
            return request;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    /**
     * Asynchronously posts data and returns a Promise of type PixEfi.
     *
     * @param {any} data - {uuid: string}
     * @return {Promise<PixTypeResp>} - {Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode}
     */
    async POST(data) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(data.uuid);
            const requestClient = await (0, GetById_1.GetFcwebLib)(requestLink.FcwebId);
            const dadosPix = {
                cpf: requestClient.cpf,
                nome: requestClient.nome,
                valorcd: requestClient.valorcd,
            };
            const pixGenerated = await (0, create_payment_1.default)(dadosPix);
            const LocId = `${pixGenerated.loc.id}`;
            const Qrcode = await (0, qrcode_1.default)(LocId);
            const DadosUpdate = {
                Pix: true,
                TxidPix: pixGenerated.txid,
                QrLink: Qrcode.linkVisualizacao,
                QrBase64: Qrcode.imagemQrcode,
                PixCopiaECola: pixGenerated.pixCopiaECola,
                PixStatus: pixGenerated.status,
                CreatePixDate: pixGenerated.calendario.criacao,
            };
            const updatePriceCert = await link_1.default.PUT(data.uuid, DadosUpdate);
            const data_retorno = {
                Uuid: updatePriceCert.Uuid,
                FcwebId: updatePriceCert.FcwebId,
                Criacao: pixGenerated.calendario.criacao,
                Expiracao: pixGenerated.calendario.expiracao,
                Status: pixGenerated.status,
                PixCopiaECola: pixGenerated.pixCopiaECola,
                LinkPgEfi: Qrcode.linkVisualizacao,
                Qrcode: Qrcode.imagemQrcode,
            };
            return data_retorno;
        }
        catch (error) {
            console.error('error', error);
            throw error;
        }
    },
    /**
     * Updates a Pix record with the specified UUID and data.
     *
     * @param {number} uuid - The UUID of the Pix record to update.
     * @return {Promise<any>} - { Uuid, FcwebId, Criacao, Expiracao, Status, PixCopiaECola, LinkPgEfi, Qrcode }.
     */
    async PUT(uuid) {
        try {
            const requestLink = await (0, GetByUuid_1.GetLinkLib)(uuid);
            const requestClient = await (0, GetById_1.GetFcwebLib)(requestLink.FcwebId);
            const dadosPix = {
                cpf: requestClient.cpf,
                nome: requestClient.nome,
                valorcd: requestClient.valorcd,
                txid: requestLink.TxidPix,
            };
            const UpdatePixGenerated = await (0, update_payment_1.default)(dadosPix);
            const LocId = `${UpdatePixGenerated.loc.id}`;
            const Qrcode = await (0, qrcode_1.default)(LocId);
            const DadosUpdate = {
                Pix: true,
                TxidPix: UpdatePixGenerated.txid,
                QrLink: Qrcode.linkVisualizacao,
                QrBase64: Qrcode.imagemQrcode,
                PixCopiaECola: UpdatePixGenerated.pixCopiaECola,
                PixStatus: UpdatePixGenerated.status,
                CreatePixDate: UpdatePixGenerated.calendario.criacao,
            };
            const updatePriceCert = await link_1.default.PUT(uuid, DadosUpdate);
            const data_retorno = {
                Uuid: updatePriceCert.Uuid,
                FcwebId: updatePriceCert.FcwebId,
                Criacao: UpdatePixGenerated.calendario.criacao,
                Expiracao: UpdatePixGenerated.calendario.expiracao,
                Status: UpdatePixGenerated.status,
                PixCopiaECola: UpdatePixGenerated.pixCopiaECola,
                LinkPgEfi: Qrcode.linkVisualizacao,
                Qrcode: Qrcode.imagemQrcode,
            };
            return data_retorno;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    /**
     * Deletes a payment by its UUID.
     *
     * @param {string} uuid - The UUID of the payment to be deleted.
     * @return {Promise<string>} A promise that resolves to a string indicating the success of the deletion.
     */
    async DELETE(uuid) {
        try {
            await prisma.price_cert.update({
                where: {
                    Uuid: uuid,
                },
                data: {
                    Pix: false,
                },
            });
            return `Pagamento uuid: ${uuid} - deletado com sucesso`;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    async pixVerifique() {
        try {
            const lista = await prisma.price_cert.findMany({
                where: {
                    Status_pg: 'Falta pagamento',
                    Pix: true,
                    TxidPix: {
                        not: null
                    }
                },
            });
            // console.log('lista', lista);
            const mapList = await Promise.all(lista.map(async (item) => {
                const verifique = await verifiquePixFunc(item.Uuid);
                return verifique;
            }));
            return mapList;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
};
exports.default = PixService;
async function verifiquePixFunc(uuid) {
    var _a, _b, _c;
    try {
        const pix = await prisma.price_cert.findUnique({
            where: {
                Uuid: uuid,
            },
        });
        const detalhePix = await (0, get_by_txid_payment_1.default)(pix.TxidPix);
        if (detalhePix.status === 'ATIVA') {
            const LocId = `${detalhePix.loc.id}`;
            const Qrcode = await (0, qrcode_1.default)(LocId);
            const DadosUpdate = {
                TxidPix: detalhePix.txid,
                QrLink: Qrcode.linkVisualizacao,
                QrBase64: Qrcode.imagemQrcode,
                PixCopiaECola: detalhePix.pixCopiaECola,
                PixStatus: detalhePix.status,
                CreatePixDate: detalhePix.calendario.criacao,
            };
            await link_1.default.PUT(pix.Uuid, DadosUpdate);
            const data = {
                Uuid: pix.Uuid,
                FcwebId: pix.FcwebId,
                Criacao: detalhePix.calendario.criacao,
                Expiracao: detalhePix.calendario.expiracao,
                Status: detalhePix.status,
                PixCopiaECola: detalhePix.pixCopiaECola,
                LinkPgEfi: Qrcode.linkVisualizacao,
                Qrcode: Qrcode.imagemQrcode,
            };
            return data;
        }
        else {
            const cliente = await prisma.fcweb.findUnique({
                where: {
                    id: pix.FcwebId
                },
                select: {
                    id: true,
                    historico: true
                }
            });
            const DateAtual = new Date();
            const dia = DateAtual.getDate() > 9 ? DateAtual.getDate() : `0${DateAtual.getDate()}`;
            const mes = DateAtual.getMonth() + 1 > 9 ? DateAtual.getMonth() + 1 : `0${DateAtual.getMonth() + 1}`;
            const ano = DateAtual.getFullYear();
            const dataFormatada = `${dia}-${mes}-${ano}`;
            const hora = DateAtual.getHours();
            const minuto = DateAtual.getMinutes();
            const segundo = DateAtual.getSeconds();
            const data_hora = `${dataFormatada}.${hora}:${minuto}:${segundo}`;
            const DataPg = new Date((_a = detalhePix.pix[0]) === null || _a === void 0 ? void 0 : _a.horario);
            const diaPg = DataPg.getDate() > 9 ? DataPg.getDate() : `0${DataPg.getDate()}`;
            const mesPg = DataPg.getMonth() + 1 > 9 ? DataPg.getMonth() + 1 : `0${DataPg.getMonth() + 1}`;
            const anoPg = DataPg.getFullYear();
            const dataFormatadaPg = `${diaPg}/${mesPg}/${anoPg}`;
            const horaPg = DataPg.getHours();
            const minutoPg = DataPg.getMinutes();
            const segundoPg = DataPg.getSeconds();
            const data_horaPg = `${dataFormatadaPg} as ${horaPg}:${minutoPg}:${segundoPg}`;
            const novoHistorico = `${cliente === null || cliente === void 0 ? void 0 : cliente.historico}${data_hora} - Efi - cleinete efetuou o pagamento efetuado em: ${data_horaPg}\n`;
            await prisma.fcweb.update({
                where: {
                    id: pix.FcwebId
                },
                data: {
                    formapgto: 'PIX',
                    vectoboleto: (_b = detalhePix.pix[0]) === null || _b === void 0 ? void 0 : _b.horario,
                    estatos_pgto: 'Pago',
                    pgto_efi: 'Pago Pix Efi',
                    historico: novoHistorico
                },
                select: {
                    id: true,
                    estatos_pgto: true,
                    pgto_efi: true,
                    historico: true
                }
            });
            const DadosUpdate = {
                Status_pg: 'Pago',
                Date_pg: (_c = detalhePix.pix[0]) === null || _c === void 0 ? void 0 : _c.horario
            };
            await link_1.default.PUT(pix.Uuid, DadosUpdate);
            const data = {
                Uuid: pix.Uuid,
                FcwebId: pix.FcwebId,
                Status: detalhePix.status,
            };
            return data;
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
