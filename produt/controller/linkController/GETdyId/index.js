"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkGETdyId = void 0;
const link_1 = __importDefault(require("../../../service/link"));
/**
 * An asynchronous function that handles the GET request for a specific link by its ID.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} a JSON response with the requested link data or an error message
 */
const LinkGETdyId = async (req, res) => {
    try {
        const { uuid } = req.params;
        const request = await link_1.default.GETdyId(uuid);
        return res.status(200).json(request);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.LinkGETdyId = LinkGETdyId;
