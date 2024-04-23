"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFcwebLib = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Retrieve a specific GetFcweb entry based on the provided id.
 *
 * @param {number} id - The id of the GetFcweb entry to retrieve
 * @return {Promise<GetFcweb>} - { id, cpf, nome, valorcd }
 */
const GetFcwebLib = async (id) => {
    try {
        const request = await prisma.fcweb.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                cpf: true,
                nome: true,
                valorcd: true,
                dtnascimento: true,
                email: true,
                telefone: true,
                endereco: true,
                bairro: true,
                uf: true,
                cep: true,
                cnpj: true,
                tipocd: true,
                cidade: true,
                razaosocial: true,
                complemento: true,
                nrua: true,
            },
        });
        return request;
    }
    catch (error) {
        console.error('Erro ao buscar registro por UUID:', error);
        throw new Error('Não foi possível buscar o registro: ' + error);
    }
};
exports.GetFcwebLib = GetFcwebLib;
