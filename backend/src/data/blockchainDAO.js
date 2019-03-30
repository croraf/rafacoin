var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/rafacoinDB";

const insertBlockInDB = (hash, block) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const insertData = { hash: hash, block: block };
        db.collection("blockchain").insertOne(insertData, (err, res) => {
          if (err) throw err;
          console.log("Block added to blockchain database.");
          db.close();
        });
      }); 
}

const getBlockFromDB = (hash) => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
    
            db.collection("blockchain").findOne({hash: hash}, (err, res) => {
              if (err) throw err;
              db.close();
              console.log('found:', res);
              resolve(res);
            });
        }); 
    });
    
}


module.exports = {insertBlockInDB, getBlockFromDB};
