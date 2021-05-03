const sinon = require('sinon');
const { FileHandler } = require('../fileHandler/fileHandler');
const path = require('path');
const test = require('unit.js');
const dataSchema = require('../schemas/income_data.schema.json');
const { Database } = require('../database/databaseHandler');

const mockedDataFromFile = [
    {
        UUID: 'dummy-value',
        VIN: 'dummy-value',
        Make: 'dummy-value',
        Model: 'dummy-value',
        Mileage: '123',
        Year: '123',
        Price: '123',
        'Zip Code': '123',
        'Create Date': '123',
        'Update Date': '123'
    }
];

const mockedParsedData = [
    {
        UUID: 'dummy-value',
        VIN: 'dummy-value',
        Make: 'dummy-value',
        Model: 'dummy-value',
        Year: 123,
        Price: 123,
        'Zip Code': 123,
        'Create Date': 123,
        'Update Date': 123
    }
];

const filePath = path.join(__dirname, './dummy-fileName.csv');

describe('FileHandler', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('When retreiveAndProcessData is called with a valid filePath, it returns a parsed data from that file', async () => {

        // Arrange
        sinon.stub(FileHandler, '_retrieveDataFromFile').returns(mockedDataFromFile);
        sinon.stub(FileHandler, '_validateData').returns(undefined);
        sinon.stub(FileHandler, '_parseData').returns(mockedParsedData);
        sinon.stub(Database, 'insertToDatabase');

        // Act
        const response = await FileHandler.retreiveAndProcessData(filePath);

        // Assert
        test.value(response).isEqualTo(mockedParsedData);
    });

    it('When retreiveAndProcessData is called with an invalid filePath, it returns a 400 statusCode and the error message', () => {
        // Arrange
        const errorMessage = 'Failed to open uploaded file';
        sinon.stub(FileHandler, '_retrieveDataFromFile').throws({ message: errorMessage });

        // Act
        try {
            FileHandler.retreiveAndProcessData(filePath);

        } catch (error) {
            // Assert
            test.value(error.message).isEqualTo(errorMessage);
        }

    });

    it('When retreiveAndProcessData and the content of the file is invalid, it returns a 400 statusCode and the validation errors', () => {
        // Arrange
        const validationErrorMessage = `Missing required fields: dummyField in file`;
        sinon.stub(FileHandler, '_retrieveDataFromFile').returns(mockedDataFromFile);
        sinon.stub(FileHandler, '_validateData').throws({ message: validationErrorMessage });

        // Act
        try {
            FileHandler.retreiveAndProcessData(filePath);

        } catch (error) {
            // Assert
            test.value(error.message).isEqualTo(validationErrorMessage);
        }

    });

    it('When the data is missing fields, _validateData returns an error message with the missing fields', () => {
        // Arrange
        const mockedErrorData = [
            {
                UUID: 'dummy-value',
                VIN: 'dummy-value',
                Make: 'dummy-value',
                Model: 'dummy-value',
                Year: 123,
                Price: 123,
                'Zip Code': 123,
                'Create Date': 123,
            }
        ];

        const validationErrorMessage = `Missing required fields: Mileage, Update Date in file`;

        // Act
        try {
            FileHandler._validateData(mockedErrorData, dataSchema);

        } catch (error) {
            // Assert
            test.value(error.message).isEqualTo(validationErrorMessage);
        }

    });

    it('When parseData is passed an object, it returns the parsed object with only the required properties and types', () => {
        // Arrange
        const mockedInputData = [
            {
                ...mockedDataFromFile,
                'dummy-extra-property': 'dummy-value'
            }

        ];

        // Act
        const response = FileHandler._parseData(mockedInputData);

        // Assert
        test.value(response).value(mockedParsedData)
    })

})