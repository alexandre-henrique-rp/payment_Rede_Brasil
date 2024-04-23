"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPUT = void 0;
const link_1 = __importDefault(require("../../../service/link"));
/**
 * Updates a link using the provided UUID and request body.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} Promise that resolves to any
 */
const LinkPUT = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { body } = req;
        const request = await link_1.default.PUT(uuid, body);
        return res.status(200).json(request);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.LinkPUT = LinkPUT;
