import { Card } from "../types/cards";
import { sqLiteAll, sqLiteGet, sqLiteRun } from "./db-connection";

// Create
export const createCard = async (card: Card): Promise<void> => {
    await sqLiteRun(`
        INSERT INTO cards (id, text)
        VALUES (?,?);
        `, [card.id, card.text]);
}

// Update
export const updateCard = async (card: Card): Promise<void> => {
    await sqLiteRun(
        `
        UPDATE cards SET text = ?
        WHERE id = ?;
        `,
        [card.text, card.id],
    );
};

// Delete
export const deleteCard = async (id: string): Promise<void> => {
    await sqLiteRun(
        `
        DELETE FROM cards
        WHERE id = ?;
        `,
        [id],
    );
};

// GetOne
export const getOneCard = async (id: string): Promise<Card | null> => {
    const data = await sqLiteGet(`
        SELECT * FROM cards
        WHERE id = ?;
        `, [id]);

    if (isCard(data)) {
        return data;
    }

    return null;
}

// GetMany
export const getManyCards = async (): Promise<Card[]> => {
    const data = await sqLiteAll(
        `
        SELECT * FROM cards
        `,
    );

    if (!Array.isArray(data)) {
        console.error(`Unknown data format on GetMany: ${data}`)
        throw new Error('Unknown data format on GetMany');
    }

    return data.map((one) => {
        if (isCard(one)) {
            return one;
        }

        return undefined
    }).filter((one) => one !== undefined);
}

const isCard = (data: unknown): data is Card => {
    const card = data as Card;
    return Boolean(data && typeof data === 'object' && card.id && card.text);
}