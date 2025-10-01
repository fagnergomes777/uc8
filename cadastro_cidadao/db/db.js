import {openDatabaseSync} from "expo-sqlite"

const db = openDatabaseSync("cidadaos.db")

/**
 * @returns{Promise}
 */

export function initDB(){
    return db.execAsync(`
        CREAT TABLE IF NOT EXISTS citizens (
            id INTEGER PRIMARY KEY NOT NULL,
            auto-incremento,
            cpf TEXT NOT NULL UNIQUE,
            obrigatório
            name TEXT NOR NULL,
            obrigatório
            birth TEXT,
            cep TEXT,
            street TEXT,
            av, etc.
            neighborhood TEXT,
            city TEXT,
            state TEXT,
            number TEXT,
            complement TEXT,
            bloco, etc.
        );
        
    `);
}