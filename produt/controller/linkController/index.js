"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GET_1 = require("./GET");
const GETdyId_1 = require("./GETdyId");
const POST_1 = require("./POST");
const PUT_1 = require("./PUT");
const DELETE_1 = require("./DELETE");
const linkController = {
    LinkGET: GET_1.LinkGET,
    LinkGETdyId: GETdyId_1.LinkGETdyId,
    LinkPOST: POST_1.LinkPOST,
    LinkPUT: PUT_1.LinkPUT,
    LinkDELETE: DELETE_1.LinkDELETE,
};
exports.default = linkController;
