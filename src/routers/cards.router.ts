import express, { Request, Response } from 'express';
import { Card, CreateCardRequest, GetCardsResponse } from '../types/cards';
import { IdParams } from '../types/common';

export const cardsRouter = express.Router();

cardsRouter.get(
    '/',
    (request: Request<{}, {}>, response: Response<GetCardsResponse>) => {
        // Todo: Return cards
    },
);

cardsRouter.get(
    '/:id',
    (request: Request<IdParams, {}>, response: Response<Card>) => {
        // Todo: Return card
    },
);

cardsRouter.post(
    '/',
    (request: Request<{}, CreateCardRequest>, response: Response<Card>) => {
        // Todo: Create cards
    },
);

cardsRouter.put(
    '/:id',
    (request: Request<IdParams, Card>, response: Response<Card>) => {
        // Todo: Update card
    },
);

cardsRouter.delete(
    '/:id',
    (request: Request<IdParams>, response: Response<void>) => {
        // Todo: Delete card
    },
);
