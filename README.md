## API
<text style="color: #FFA500;font-size: 20px;font-weight: bold" >POST </text> Upload a .csv file.

<text style="background-color: #DCDCDC;font-size: 20px;font-weight: bold" > /upload </text>
### 

##### URL Params
| Name     | Description          | Example      | Required |
|----------|----------------------|--------------|----------|
| provider | Name of the provider | testProvider | Yes      |

##### Body schema
Body type: `form-data`

| Key  | Type | Value                            |
|------|------|----------------------------------|
| file | File | Select a file from your computer.|

## Testing the API
### Starting the server
- Start by defining the port in the .env file.
    ![Setting .env file](documentation/settingEnv.png)

- Go to the root directory of the project and run `node .`
    ![Starting server](documentation/runServer.png)

Now our server is running, we can test our endpoint


### Setting up the data file
Generate a .csv file with the following columns:
![Generating the data](documentation/testDatacsv.png)

> Note: UUID, VIN Make and Model should be text, and Mileage, Year, Price, Zip Code, Create Date and Update Date should be integers.
### Testing the endpoint
![Testing the endpoint](documentation/testPostmanReq.png)
1. The method is POST.
2. In the request Url, the provider name is passed by parameter.
3. The body type is form-data.
4. Set the "key name" as file and type file and select the file to upload.
5. Press Send.

If it is a valid file, the endpoint will return a meesage and will store the generated .csv file in the /storage directory named as the provider.

![uploadSuccess](documentation/uploadSuccess.png)
![fileStored](documentation/fileStored.png)

If the file is missing columns, the request will return a validation error indicating the missing required fields:
![validationError](documentation/validationError.png)

> Note: If the original file has extra columns, the generated .csv will only containg the required ones.

#### Dependencies
| Depedencies    | Description                                                                  |
|----------------|------------------------------------------------------------------------------|
| express        | Framework to create server.                                                  |
| mocha          | Framework for unit testing.                                                  |
| csv-parse      | Parser to convert .csv files into array to process the data.                 |
| fs             | Module to work with the file system, particularly to read the uploaded file. |
| dotenv         | Modue to read environment variables from a .env file.                        |
| jsonschema     | Module used to validate the required fields from the file.                   |
| multer         | Middleware to handle the processing of the file in the request.              |
| objects-to-csv | Module used to parse the data as object and store it as a .csv fie.          |
| sinon          | Module to mock functions in unit tests.                                      |
| supertest      | Module used to test the endpoint.                                            |
| unit.js        | Module used for the assertions in the unit tests.                            |