import './env.js';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { routes } from './routes.js';
import { applyRoutes } from './utils/applyRoutes.js';
import initDb from './initDB.js';

const router = express();
const port = process.env.PORT || 5000;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// API calls
router.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

applyRoutes(routes, router);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    router.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

initDb();

router.listen(port, () => console.log(`Listening on port ${port}`));
