var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

const getMetadata = (hash) => {
    
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            else {
                db.collection("meta").findOne({type: 'blockchainMeta'}, (err, res) => {
                    if (err) reject(err);
                    else {
                        db.close();
                        // console.log('Metadata found: ', res);
                        resolve(res);
                    }
                });
            }
        }); 
    });
}

const updateBlockchainMetadata = (blockchainTipHash, blockchainHeight) => {
    
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            else {
                db.collection("meta").update(
                    {type: 'blockchainMeta'},
                    {
                        type: 'blockchainMeta',
                        blockchainTipHash: blockchainTipHash,
                        blockchainHeight: blockchainHeight,
                        target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3'
                    }, 
                    (err, res) => {
                        if (err) reject(err);
                        else {
                            db.close();
                            console.log('Metadata updated: ', res.result);
                            resolve(res.result);
                        }
                    }
                );
            }
        }); 
    });
    
}

export {getMetadata, updateBlockchainMetadata};