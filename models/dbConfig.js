const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://apiUser:WvCSdcFNK9iDe7Az@54.37.11.85:27017/azonar?authMechanism=DEFAULT&authSource=azonar",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (!err) console.log("Connected to the database !");
        else console.log("Connection error : " + err);
    }
);