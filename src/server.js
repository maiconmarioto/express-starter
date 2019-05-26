const fs = require('fs');
const path = require('path');
const express = require('express')
const createLocaleMiddleware = require('express-locale')
const bodyParser = require('body-parser')
const cors = require('cors');
const compression = require('compression');
const jwt = require('express-jwt');

const config = require('./config');
const logger = require('./utilities/logger');
const { startPolyglot } = require('./utilities/i18n/startPolyglot')

const app = express()
const port = process.env.PORT || 8080

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(createLocaleMiddleware({
    "priority": ["accept-language", "default"],
    "default": "pt_BR"
}))

app.use(
    jwt({ secret: config.jwt.secret }).unless({
        path: [
            '/',
            '/auth/signup',
            '/auth/login',
            '/auth/logout',
            '/auth/forgot-password',
            '/auth/reset-password'
        ]
    })
);

app.use(startPolyglot)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Missing authentication credentials.');
    }
});



app.listen(config.server.port, (err) => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }

    require('./utilities/db');

    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
        require('./routes/' + file)(app);
    });

    logger.info(
        `app is now running on port ${config.server.port} in ${config.env} mode`
    );
})