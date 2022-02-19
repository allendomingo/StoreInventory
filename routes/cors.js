const express = require('express');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOption = cors(corsOptionsDelegate);