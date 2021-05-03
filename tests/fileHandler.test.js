const sinon = require('sinon');
const { FileHandler } = require('../fileHandler/fileHandler');
const path = require('path');
const test = require('unit.js');
const fs = require('fs');
var parse = require('csv-parse/lib/sync');
const { deepEqual } = require('should');

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

    it('When retreiveAndProcessData is called with a valid filePath, it returns a parsed data from that file', () => {

        // Arrange
        sinon.stub(FileHandler, '_retrieveDataFromFile').returns(mockedDataFromFile);
        sinon.stub(FileHandler, '_validateData').returns(undefined);
        sinon.stub(FileHandler, '_parseData').returns(mockedParsedData);

        // Act
        const response = FileHandler.retreiveAndProcessData(filePath);

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
})