"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const nodeEnv = process.env.NODE_ENV === 'dev';
const ClientId = nodeEnv
    ? process.env.CLIENT_ID_SANDBOX
    : process.env.CLIENT_ID;
const ClientSecret = nodeEnv
    ? process.env.CLIENT_SECRET_SANDBOX
    : process.env.CLIENT_SECRET;
const Cetficated = nodeEnv
    ? process.env.CERT_USER_SANDBOX
    : process.env.CERT_USER;
exports.default = {
    sandbox: nodeEnv,
    client_id: ClientId,
    client_secret: ClientSecret,
    certificate: path_1.default.resolve(__dirname, `./${Cetficated}`),
};
