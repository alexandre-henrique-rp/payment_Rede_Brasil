"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkGET = void 0;
const link_1 = __importDefault(require("../../../service/link"));
/**
 * Retrieves a link using a GET request.
 *
 * @param {Request} req - the request object
 * @param {Response} res - {data:[{Uuid,  FcwebId,  Date_int,  Status_pg,  Cliente_acess, UrlPg, Pix,  Boleto,  Cartao}, ...], count: number}
 */
const LinkGET = async (req, res) => {
    try {
        const request = await link_1.default.GET();
        return res.status(200).json(request);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.LinkGET = LinkGET;
