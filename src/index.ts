import express from 'express';
import { PORT } from './config.js';
import { cardsRouter } from './routers/cards.router.js';

const server = express();

server.get('/', (request, response) => {
    response.send('Youre ok');
});

server.use('/cards', cardsRouter)

server.listen(PORT);
