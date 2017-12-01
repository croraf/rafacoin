var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

const getMetadata = async (hash) => {
    
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
    
            db.collection("meta").findOne({type: 'blockchainMeta'}, (err, res) => {
                if (err) throw err;
                db.close();
                console.log('Metadata found: ', res);
                resolve(res);
            });
        }); 
    });
    
}

export {getMetadata};