import { sqLiteRun } from './db-connection';

export const createTables = async (): Promise<void> => {
    await sqLiteRun(`
        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL
        );
        `);
};
