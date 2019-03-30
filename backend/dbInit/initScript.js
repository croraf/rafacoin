const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const init = async () => {
    const client = new MongoClient(url);

    await client.connect();
    console.log('Mongo client connected');
    const db = client.db('rafacoinDB');

    try {
        await db.collection('blockchain').drop();
        console.log('blockchain collection dropped');
    } catch (err){
        console.log('cannot drop blockchain collection:', err);
    }

    const genesisBlock = {
        hash: 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        block : {
            previousHash: undefined,
            transactions: [],
            target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
            noonce: 0
        }
    };
    await db.collection('blockchain').insertOne(genesisBlock);
    console.log('Genesis block inserted into blockchain collection!');

    try {
        await db.collection('transactions').drop();
        console.log('transactions collection dropped');
    } catch (err){
        console.log('cannot drop transactions collection:', err);
    }

    try {
        await db.collection('meta').drop();
        console.log('meta collection dropped');
    } catch (err){
        console.log('cannot drop meta collection:', err);
    }
    const metaDocument = {
        type: 'blockchainMeta',
        blockchainTipHash: 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        blockchainHeight: 0,
        target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3'
    };
    await db.collection('meta').insertOne(metaDocument);
    console.log('Meta info inserted!');

    try {
        await db.collection('UTxO').drop();
        console.log('UTxO collection dropped');
    } catch (err){
        console.log('cannot drop UTxO collection:', err);
    }

    try {
        await client.close();
        console.log('mongo client closed');
    } catch (err){
        console.log('cannot close mongo client:', err);
    }
    
};

init();


