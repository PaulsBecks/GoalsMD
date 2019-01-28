const express = require('express')
const app = express()
require('./models/User')
require('./models/Goal')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)

app.use(cookieSession({ maxAge: 30 * 24 * 60 * 1000, keys: [keys.cookieKey] }))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use('', express.static('client/build/'))

require('./passport')

require('./routes/auth')(app)
require('./routes/api')(app)

app.listen(5000)
