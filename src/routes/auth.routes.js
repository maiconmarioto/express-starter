const { validator } = require('../validator/auth.validator')
const { procErr } = require('../utilities/i18n/processErrors')
const { login, forgotPassword } = require('../controller/auth.controller')

// Routes =============================================================
module.exports = app => {

    // POST route to mock a login  endpoint
    app.post("/api/login", validator('login'), procErr, login)

    // POST route to mock a forgotten password endpoint
    app.post("/api/forgot-password", validator('forgotPassword'), procErr, forgotPassword)

}