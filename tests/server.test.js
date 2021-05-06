const sinon = require('sinon');
const { FileHandler } = require('../fileHandler/fileHandler');
const path = require('path');
const request = require('supertest');
const test = require('unit.js');
const app = require('../index');

describe('Server', () => {
    it('When file is uploaded correctly with the required parameters, returns 200 and success message', async () => {
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
        const result = await request(app).post('/upload?provider=mockProvider')
            .attach('file', path.join(__dirname, 'mockedData.csv'))
            .expect(200)
        // Assert
        test.value(result.status).isEqualTo(200);
        test.value(result.body.message).isEqualTo(expectedMessage);

    });
})