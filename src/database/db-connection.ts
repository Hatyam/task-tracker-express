import sqlite3 from 'sqlite3';
import { SQLITE_PATH } from '../config';

const db = new sqlite3.Database(SQLITE_PATH, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log('Database connected');
});

// run, get, all

export const sqLiteRun = (
    sql: string,
    params?: unknown[],
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (error: unknown, data: unknown) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
};

export const sqLiteGet = (
    sql: string,
    params?: unknown[],
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (error: unknown, data: unknown) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
};

export const sqLiteAll = (
    sql: string,
    params?: unknown[],
): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (error: unknown, data: unknown) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
};
