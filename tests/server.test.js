const sinon = require('sinon');
const { FileHandler } = require('../fileHandler/fileHandler');
const path = require('path');
const supertest = require('supertest');
const test = require('unit.js');

const url = 'http://localhost:3000/upload?provider=mockedProvider';
const request = supertest(url);


describe('Server', () => {
    const url = 'http://localhost:3000/upload?provider=mockedProvider';

    it('When file is uploaded correctly with the required parameters, returns 200 and success message', () => {
        // Arrange
        const mockedData = [
            {
                UUID: 'dummyValue',
                VIN: 'dummyValue',
                Make: 'dummyValue',
                Model: 'dummyValue',
                Mileage: 'dummyValue',
                Year: 12345,
                Price: 12345,
                'Zip Code': 12345,
                'Create Date': 12345,
                'Update Date': 12345
            }
        ];

        const expectedMessage = 'File uploaded successfully!';
        sinon.stub(FileHandler, 'retreiveAndProcessData').returns(mockedData);

        // Act
        request.post(url)
            .attach('file', path.join(__dirname, 'mockedData.csv'))
            .end(function (err, res) {

                // Assert
                test.value(res.status).isEqualTo(200);
                test.value(res.body.message).isEqualTo(expectedMessage);
            });

    });
})