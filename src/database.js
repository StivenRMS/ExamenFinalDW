const mogoose = require('mongoose');

mogoose.connect('mongodb://mongo:27017/mydatabase') 
    .then(db => console.log('DB is connected', db.connection.host))
    .catch(err => console.error(err));

