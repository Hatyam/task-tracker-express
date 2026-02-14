import { Board } from "../types/boards";
import { sqLiteAll, sqLiteGet, sqLiteRun } from "./db-connection";

// Create
export const createBoard = async (board: Board): Promise<void> => {
    await sqLiteRun(`
        INSERT INTO boards (id, name)
        VALUES (?,?);
        `, [board.id, board.name]);
}

// Update
export const updateBoard = async (board: Board): Promise<void> => {
    await sqLiteRun(
        `
        UPDATE boards SET name = ?
        WHERE id = ?;
        `,
        [board.name, board.id],
    );
};

// Delete
export const deleteBoard = async (id: string): Promise<void> => {
    await sqLiteRun(
        `
        DELETE FROM boards
        WHERE id = ?;
        `,
        [id],
    );
};

// GetOne
export const getOneBoard = async (id: string): Promise<Board | null> => {
    const data = await sqLiteGet(`
        SELECT * FROM boards
        WHERE id = ?;
        `, [id]);

    if (isBoard(data)) {
        return data;
    }

    return null;
}

// GetMany
export const getManyBoards = async (): Promise<Board[]> => {
    const data = await sqLiteAll(
        `
        SELECT * FROM boards
        `,
    );

    if (!Array.isArray(data)) {
        console.error(`Unknown data format on GetMany: ${data}`)
        throw new Error('Unknown data format on GetMany');
    }

    return data.map((one) => {
        if (isBoard(one)) {
            return one;
        }

        return undefined
    }).filter((one) => one !== undefined);
}

const isBoard = (data: unknown): data is Board => {
    const board = data as Board;
    return Boolean(data && typeof data === 'object' && board.id && board.name);
}