const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://localhost:4200'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOption = cors(corsOptionsDelegate);
