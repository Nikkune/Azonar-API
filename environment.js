const port = 5500;
const whitelist = ['https://azonar.fr', 'https://www.azonar.fr'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


exports.port = port;
exports.whitelist = whitelist;
exports.corsOptions = corsOptions;