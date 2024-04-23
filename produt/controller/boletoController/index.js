"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GETdyId_1 = require("./GETdyId");
const POST_1 = require("./POST");
const PUT_1 = require("./PUT");
const DELETE_1 = require("./DELETE");
const POSTBoleto_1 = require("./POSTBoleto");
const boletoController = {
    BoletoPOSTUuid: POSTBoleto_1.BoletoPOSTUuid,
    BoletoGETdyId: GETdyId_1.BoletoGETdyId,
    BoletoPOST: POST_1.BoletoPOST,
    BoletoPUT: PUT_1.BoletoPUT,
    BoletoDELETE: DELETE_1.BoletoDELETE,
};
exports.default = boletoController;
