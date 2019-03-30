const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let db;

const initializeMongoClient = async () => {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Mongo client connected');
    db = client.db('rafacoinDB');
};

const getConnection = () => {
    return db;
};

module.exports = {initializeMongoClient, getConnection};
