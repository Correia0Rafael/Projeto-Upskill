const express = require('express');
const apiRouter  = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/rfid', apiRouter);

app.listen( process.env.PORT || '3030', () => {

    console.log(`Server running on port: ${process.env.PORT || '3030'}`);

});

// rfid - criado servidor a escutar no porta 3030