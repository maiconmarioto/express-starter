const Polyglot = require('node-polyglot')
const { messages } = require('../../i18n/i18n')

exports.startPolyglot = (req, res, next) => {

    // Get the locale from express-locale
    const locale = req.locale.language

    // Start Polyglot and add it to the req
    req.polyglot = new Polyglot()

    // Decide which phrases for polyglot
    console.log('LOCALE', locale);
    if (locale == 'pt' || locale == 'pt_BR') {
        req.polyglot.extend(messages.pt)
    } else {
        req.polyglot.extend(messages.en)
    }

    next()
}