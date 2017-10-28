"use strict";

var keypair = require('keypair');

var pair = keypair();

var crypto = require("crypto");

console.log(crypto.publicEncrypt(pair.public, new Buffer("message")));
/*const encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = fs.readFileSync(absolutePath, "utf8");
    const buffer = new Buffer(toEncrypt);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    const privateKey = fs.readFileSync(absolutePath, "utf8");
    const buffer = new Buffer(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
};*/