const {getConnection} = require('./db');
const ObjectID = require('mongodb').ObjectID;

const addUTxO = async (UTxO) => {

    await getConnection().collection("UTxO").insertOne(UTxO);
    console.log("UTxO added to UTxO collections.");
}

const deleteUTxO = async (txID, outputIndex) => {

    return await getConnection().collection("UTxO").deleteOne({txID: txID, outputIndex: outputIndex}).result;
}

const getUTxO = async (_id) => {

    return await getConnection().collection("UTxO").findOne({'_id': new ObjectID(_id)});
}

const getAllUTxO = async () => {
    const result = await getConnection().collection("UTxO").find({}).toArray();
    console.log('All UTXO:', result);
    return result;
}

module.exports = {addUTxO, deleteUTxO, getUTxO, getAllUTxO};
