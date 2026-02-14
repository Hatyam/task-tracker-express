import express, { Request, Response } from 'express';
import { ADMIN_LOGIN, ADMIN_PASSWORD, PORT } from './config.js';
import { cardsRouter } from './routers/cards.router.js';
import { createTables } from './database/create-tables.js';
import basicAuth from 'express-basic-auth';
import { logger } from './logger.js';
import { boardsRouter } from './routers/boards.router.js';

function middleWare(request: Request, response: Response, next: () => void,): void {}

async function run() {
    await createTables();

    const server = express();
    // server.use(middleWare);
    server.use(
        basicAuth({
            users: { [ADMIN_LOGIN]: ADMIN_PASSWORD },
            challenge: true,
        }),
    );
    server.use(express.json());
    server.use(logger);

    server.get('/', (request, response) => {
        response.send('Youre ok');
    });

    server.use('/boards', boardsRouter);
    server.use('/cards', cardsRouter);

    server.listen(PORT);
}

run().catch((error) => console.error(error));
