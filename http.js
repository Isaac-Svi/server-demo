const http = require('http');
const db = require('./database.js');

const usersRouteHandlers = {
    GET: (res) => {
        res.writeHead(200);
        res.end(JSON.stringify(db.users));
    },
    POST: () => {},
};

const addUserRouteHandlers = {
    GET: () => {},
    POST: (res) => {
        res.writeHead(200);
        db.users.push({
            id: 3,
            name: 'asdf',
            password: 'qp398fapsdoikjasd',
        });
        res.end(JSON.stringify(db.users));
    },
};

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/users':
            usersRouteHandlers[req.method](res);
            break;
        case '/add-user':
            addUserRouteHandlers[req.method](res);
            break;
    }
});

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
