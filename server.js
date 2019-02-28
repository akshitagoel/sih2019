const express = require('express')
const app = express()
const config = require('./config');
const session = require('express-session')
const passport = require('./passport')
const path = require('path')
const hbs = require("hbs")
const bodyParser = require('body-parser')

hbs.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifNotEqual", function(arg1, arg2, options) {
    return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret message',
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')


app.use('/users', require('./routes/users'))
app.use('/pages', require('./routes/pages'))
app.use('/filter', require('./routes/filter'))
app.use('/image-upload', require('./routes/image-upload'))
app.use('/land-id', require('./routes/land-id'))
app.use('/land-images', require('./routes/land-images'))
//app.use('/location', require('./routes/location'))


app.use('/', express.static(path.join(__dirname, 'public')))


app.listen(config.PORT, () => console.log("Server listening to "+ config.PORT))
