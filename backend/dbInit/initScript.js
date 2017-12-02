var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection("blockchain").remove({}, (err, res) => {
        if (err) throw err;
        console.log("Blockchain collection cleared!");

        var genesisBlock = {
            hash: 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
            block : {
                previousHash: undefined,
                transactions: [],
                target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
                noonce: 0
            }
        };
    
        db.collection("blockchain").insertOne(genesisBlock, (err, res) => {
            if (err) throw err;
            console.log("Genesis block inserted!");

            db.close();
        });
    });
});


MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection("meta").remove({}, (err, res) => {
        if (err) throw err;
        console.log("Meta collection cleared!");

        const metaDocument = {
            type: 'blockchainMeta',
            blockchainTipHash: 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
            blockchainHeight: 0,
            target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3'
        }
    
        db.collection("meta").insertOne(metaDocument, (err, res) => {
            if (err) throw err;
            console.log("Meta info inserted!");
            
            db.close();
        });


    });
}); 

MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection("UTxO").remove({}, (err, res) => {
        if (err) throw err;
        console.log("UTxO collection cleared!");

        /* const metaDocument = {
            type: 'blockchainMeta',
            blockchainTipHash: 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
            blockchainHeight: 0,
            target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3'
        }
    
        db.collection("meta").insertOne(metaDocument, (err, res) => {
            if (err) throw err;
            console.log("Meta info inserted!");
            
            db.close();
        }); */

        db.close();
    });
}); 


