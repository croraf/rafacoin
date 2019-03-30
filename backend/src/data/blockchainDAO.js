const {getConnection} = require('./db');

const insertBlockInDB = async (hash, block) => {

  const insertData = { hash: hash, block: block };
  await getConnection().collection("blockchain").insertOne(insertData);
  console.log("Block added to blockchain database.");
}

const getBlockFromDB = async (hash) => {

  return await getConnection().collection("blockchain").findOne({hash: hash});
}


module.exports = {insertBlockInDB, getBlockFromDB};
