import express from 'express';
import { PORT } from './config.js';
import { cardsRouter } from './routers/cards.router.js';
import { createTables } from './database/create-tables.js';

async function run() {
    await createTables();

    const server = express();
    server.use(express.json());

    server.get('/', (request, response) => {
        response.send('Youre ok');
    });

    server.use('/cards', cardsRouter);

    server.listen(PORT);
}

run().catch((error) => console.error(error));
