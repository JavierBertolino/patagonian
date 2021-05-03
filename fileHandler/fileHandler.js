const fs = require('fs');
var parse = require('csv-parse/lib/sync');
const validate = require('jsonschema').validate;
const dataSchema = require('../schemas/income_data.schema.json');
const { Database } = require('../database/databaseHandler');

class FileHandler {

    static async retreiveAndProcessData(filePath, providerName) {
        const data = this._retrieveDataFromFile(filePath);
        this._validateData(data, dataSchema);
        const parsedData = this._parseData(data);
        await Database.insertToDatabase(parsedData, providerName);

        return parsedData;
    }

    static _retrieveDataFromFile(filePath) {
        try {

            const records = fs.readFileSync(filePath, 'utf8');
            console.log(records);
            const data = parse(records, { columns: true });

            return data;
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to open uploaded file');
        }
    }


    static _validateData(dataObject, schema) {
        const result = validate(dataObject[0], schema);

        if (result.errors && result.errors.length !== 0) {
            const errors = result.errors.map(error => `${error.argument}`).join(', ');
            validationErrors = `Missing required fields: ${errors} in file`;
            throw new Error(`${validationErrors}`);
        }

    }

    static _parseData(data) {
        const parsed = data.map((item) => {
            return {
                UUID: item.UUID,
                VIN: item.VIN,
                Make: item.Make,
                Model: item.Model,
                Mileage: item.Mileage,
                Year: Number(item.Year),
                Price: Number(item.Price),
                'Zip Code': Number(item['Zip Code']),
                'Create Date': Number(item['Create Date']),
                'Update Date': Number(item['Update Date'])
            }
        });

        return parsed;
    }

}

module.exports = {
    FileHandler
}