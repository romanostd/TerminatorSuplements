const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db
const port = process.env.PORT ? Number(process.env.Port) : 3000
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(port, () => {
    console.log("Backend executando...")
})