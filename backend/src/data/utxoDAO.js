var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

const addUTxO = (UTxO) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        db.collection("UTxO").insertOne(UTxO, (err, res) => {
          if (err) throw err;
          console.log("UTxO added to UTxO collections.");
          db.close();
        });
      }); 
}

const deleteUTxO = (txID, outputIndex) => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
    
            db.collection("UTxO").delete({txID: txID, outputIndex: outputIndex}, (err, res) => {
              if (err) throw err;
              db.close();
              console.log('found:', res);
              resolve(res);
            });
        }); 
    });
    
}

const getUTxO = (hash) => {
    
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            else {
                db.collection("UTxO").find({}).toArray((err, result) => {
                    console.log('All UTXO:', result);
                    resolve(result);
                });
            }

            db.close();
        }); 
    });
}

export {addUTxO, deleteUTxO, getUTxO};