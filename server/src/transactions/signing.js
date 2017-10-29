import keypair from 'keypair';

import crypto from 'crypto';

const generateKeys = () => {
    return keypair();
};


const sign = crypto.createSign('SHA256');

const signData = (data, privateKey) => {
    sign.write(data);
    sign.end();

    return sign.sign(privateKey, 'hex');
};


const verify = crypto.createVerify('SHA256');

const verifySignature = (data, signature, publicKey) => {
    verify.write(data);
    verify.end();
    
    return verify.verify(publicKey, signature, 'hex');
};


export {generateKeys, signData, verifySignature};
