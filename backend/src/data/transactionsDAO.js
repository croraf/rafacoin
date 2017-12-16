var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

const addTransactionToDB = (txID, signedTransaction) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const insertData = { txID: txID, signedTransaction: signedTransaction };

        db.collection("transactions").insertOne(insertData, (err, res) => {
          if (err) throw err;
          console.log("Transaction added to transactions database.");
          db.close();
        });
      }); 
}

const getTransactionsFromDB = () => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
    
            db.collection("transactions").find({}).toArray((err, res) => {
                if (err) throw err;
                db.close();
                console.log('found:', res);
                resolve(res);
            });
        }); 
    });
}

const removeTransactionFromDB = (txID) => {

    return new Promise((resolve, reject) => {
        
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
    
            db.collection("transactions").deleteOne({txID: txID}, (err, res) => {
                if (err) throw err;
                db.close();
                console.log('found:', res.result);
                resolve(res);
            });
        }); 
    });
}


export {addTransactionToDB, getTransactionsFromDB, removeTransactionFromDB};