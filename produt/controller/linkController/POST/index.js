"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPOST = void 0;
const link_1 = __importDefault(require("../../../service/link"));
/**
 * A function that handles a POST request for a link.
 *
 * @param {Request} req - the request object
 * @body {Request}
 * @param {Response} res - the response object
 */
const LinkPOST = async (req, res) => {
    try {
        const { body } = req;
        const BaseUrl = process.env.BASE_URL_PAYMENT;
        const request = await link_1.default.POST(body);
        const data = { UrlPg: `${BaseUrl}/${request.Uuid}` };
        const update = await link_1.default.PUT(request.Uuid, data);
        return res.status(201).json(update);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.LinkPOST = LinkPOST;
