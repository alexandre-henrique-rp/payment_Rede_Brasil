"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GET_1 = require("./GET");
const GETdyId_1 = require("./GETdyId");
const POST_1 = require("./POST");
const PUT_1 = require("./PUT");
const DELETE_1 = require("./DELETE");
const VERIFIQUEbyId_1 = require("./VERIFIQUEbyId");
const VERIFIQUE_1 = require("./VERIFIQUE");
const pixController = {
    VERIFIQUE: VERIFIQUE_1.VERIFIQUE,
    VERIFIQUEbyId: VERIFIQUEbyId_1.VERIFIQUEbyId,
    PixGET: GET_1.PixGET,
    PixGETdyId: GETdyId_1.PixGETdyId,
    PixPOST: POST_1.PixPOST,
    PixPUT: PUT_1.PixPUT,
    PixDELETE: DELETE_1.PixDELETE,
};
exports.default = pixController;
