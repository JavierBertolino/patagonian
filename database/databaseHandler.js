const ObjectsToCsv = require('objects-to-csv');

class Database {
    static async insertToDatabase(data, providerName) {
        const csv = new ObjectsToCsv(data);
        await csv.toDisk(`./storage/${providerName}.csv`);
    }
}

module.exports = { Database }