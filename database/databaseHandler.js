const ObjectsToCsv = require('objects-to-csv');
const path = require('path')

class Database {
    static async insertToDatabase(data, providerName) {
        const csv = new ObjectsToCsv(data);
        await csv.toDisk(path.join(__dirname, `/storage/${providerName}.csv`));
    }
}

module.exports = { Database }