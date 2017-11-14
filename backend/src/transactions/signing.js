import keypair from 'keypair';

import crypto from 'crypto';

const generateKeys = () => {
    return keypair();
};




const signData = (data, privateKey) => {

    const sign = crypto.createSign('SHA256');

    sign.write(data);
    sign.end();

    return sign.sign(privateKey, 'hex');
};




const verifySignature = (data, signature, publicKey) => {

    const verify = crypto.createVerify('SHA256');
    
    verify.write(data);
    verify.end();
    
    return verify.verify(publicKey, signature, 'hex');
};


export {generateKeys, signData, verifySignature};
