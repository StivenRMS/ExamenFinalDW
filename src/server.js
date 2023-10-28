const express = require('express');
const api = require('./api');
const app = express();



app.listen(3000, () => {
    console.log('Server on port 3000');
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/api', api);
