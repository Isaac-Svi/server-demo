const express = require('express');

const db = require('./database.js');

const app = express();

// ========================================= MIDDLEWARE ========================================
// app.use(express.json());
// app.use(express.urlencoded());
app.use((req, res, next) => {
    req.body = '';

    const converters = {
        'application/json': JSON.parse,
        'application/x-www-form-urlencoded': (url) =>
            Object.fromEntries(url.split('&').map((x) => x.split('='))),
        default: (url) => {
            try {
                url = JSON.parse(url);
                return url;
            } catch {
                return {};
            }
        },
    };

    const converter =
        converters[req.headers['content-type']] || converters.default;

    req.on('data', (data) => {
        req.body += data.toString();
    });

    req.on('end', () => {
        req.body = converter(req.body);
        next();
    });
});

// =========================================== ROUTES ===========================================
// get list of all users and their details
app.get('/users', (request, response) => {
    response.send(db.users);
});

// add new user
app.post('/add-user', (req, res) => {
    const newUser = req.body;

    if (!newUser.name)
        return res.status(400).send("You didn't give user a name!");

    // step 1 - create a new id for our user
    const newId = db.users.length + 1;

    // step 2 - add the newId to newUser
    newUser.id = newId;

    // step 3 - add new user
    db.users.push(newUser);

    res.send(db.users);
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:${3000}`);
});
