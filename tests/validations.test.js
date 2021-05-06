const sinon = require('sinon');
const { Validations } = require('../validations');
const test = require('unit.js');


describe('FileHandler', () => {

    it('When _validateFile is called without a file, it returns an error informing that the file is invalid', () => {
        const errorMessage = 'Invalid file type, file must be .csv';

        try {
            Validations._validateFile(undefined);
        } catch (error) {
            test.value(error.message).isEqualTo(errorMessage)
        }
    });


    it('When _validateFile is called without a wrong type of file, it returns an error informing that the file is invalid', () => {
        const errorMessage = 'Invalid file type, file must be .csv';
        const file = {
            fieldname: 'file',
            originalname: 'dummyFIle.js',
            encoding: 'dummy-encoding',
            mimetype: 'application/javascript',
            destination: 'uploads',
            filename: 'dummy-fileName',
            path: 'uploads\\dummy-fileName',
            size: 1234
        }
        try {
            Validations._validateFile(undefined);
        } catch (error) {
            test.value(error.message).isEqualTo(errorMessage)
        }
    });

    it('When _validateParameter is called without with more than one parameter, it throws an error', () => {
        const parameters = {
            mockParam1: 'dummy-param',
            mockParam2: 'dummy-param2'
        };

        const errorMessage = 'The request url should have only the "provider" parameter';

        try {
            Validations._validateParameter(parameters);
        } catch (error) {
            test.value(error.message).isEqualTo(errorMessage)
        }
    });

    it('When _validateParameter is called without with one parameter but is not the provider, it throws an error', () => {
        const parameters = {
            provider: 'dummy-param',
        };

        const errorMessage = 'Missing required parameter "provider" in request url';

        try {
            Validations._validateParameter(parameters);
        } catch (error) {
            test.value(error.message).isEqualTo(errorMessage)
        }
    });

});