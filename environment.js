const port = 5500;
const whitelist = ['https://azonar.fr', 'https://www.azonar.fr', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

function generateToken() {
    const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    let token = [];
    for (let x = 0; x < 40 ; x++){
        const y = (Math.random() * (base.length - 1)).toFixed(0);
        token[x] = base[y];
    }
    return token.join("");
}

exports.port = port;
exports.whitelist = whitelist;
exports.corsOptions = corsOptions;
exports.generateToken = generateToken;