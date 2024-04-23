"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkDELETE = void 0;
const link_1 = __importDefault(require("../../../service/link"));
/**
 * Asynchronous function that handles the deletion of a link.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<any>} Promise that resolves when the deletion is successful
 */
const LinkDELETE = async (req, res) => {
    try {
        const { uudi } = req.params;
        const request = await link_1.default.DELETE(uudi);
        return res.status(201).json(request);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.LinkDELETE = LinkDELETE;
