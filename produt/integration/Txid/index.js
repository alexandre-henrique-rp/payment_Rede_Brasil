"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const tamanhoMinimo = 26;
const tamanhoMaximo = 35;
const padrao = /^[a-zA-Z0-9]{26,35}$/;
/**
 * Generates a random string of characters within a specified range.
 *
 * @return {string} the randomly generated string
 */
function geraStringAleatoria() {
    const tamanhoAleatorio = Math.floor(Math.random() * (tamanhoMaximo - tamanhoMinimo + 1)) + tamanhoMinimo;
    const buffer = (0, crypto_1.randomBytes)(tamanhoAleatorio);
    let stringAleatoria = '';
    for (let i = 0; i < buffer.length; i++) {
        stringAleatoria += caracteresPermitidos.charAt(buffer.readUInt8(i) % caracteresPermitidos.length);
    }
    return stringAleatoria;
}
/**
 * Validates a string.
 *
 * @param {string} string - the string to be validated
 * @return {boolean} true if the string matches the pattern, false otherwise
 */
function validaString(string) {
    return padrao.test(string);
}
/**
 * Generate a random string until a valid one is obtained.
 *
 * @return {string} The valid random string generated.
 */
function Txid() {
    let stringAleatoria;
    do {
        stringAleatoria = geraStringAleatoria();
    } while (!validaString(stringAleatoria));
    return stringAleatoria;
}
exports.default = Txid;
