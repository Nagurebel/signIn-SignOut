const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid')

const router = require('./router')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')


//load satic assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: 'secret',//'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'  this type secret value
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router)

// Home Route
app.get('/', (req, res) => {
    res.render('base', { title: 'Login System' })
})

app.listen(PORT, () => {
    console.log(`Listning to the requested on http://localhost:${PORT}`);
})