
class Validations {

    static validateRequest(request) {
        this._validateParameter(request.query);
        this._validateFile(request.file);
    }


    static _validateFile(file) {
        if(!file || file.mimetype !== 'text/csv') {
            throw new Error('Invalid file type, file must be .csv');
        }
    }

    static _validateParameter(parameters) {
        if (Object.keys(parameters).length > 1) {
            throw new Error('The request url should have only the "provider" parameter');
        } else if (!parameters.provider) {
            throw new Error('Missing required parameter "provider" in request url');
        }
    }
}

module.exports = { Validations }