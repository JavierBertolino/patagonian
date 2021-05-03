const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const app = express();
const { FileHandler } = require('./fileHandler/fileHandler');


app.post('/upload', upload.single('file'), async function (req, res) {
    try {
        const data = await FileHandler.retreiveAndProcessData(path.join(__dirname, req.file.path), req.query.provider);
        console.log(data);
        res.status(200).send({message: 'File uploaded successfully!'});

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

app.listen(process.env.PORT, function () {
    console.log('Express server listening on', process.env.PORT);
});

