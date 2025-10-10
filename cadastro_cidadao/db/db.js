import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("cidadaos.db");

/**
 * @returns{Promise}
 */

export function initDB() {
  return db.execAsync(`
        CREATE TABLE IF NOT EXISTS citizens (
            id INTEGER PRIMARY KEY NOT NULL,
            auto-incremento
            cpf TEXT NOT NULL UNIQUE,
            obrigatório
            name TEXT NOT NULL,
            obrigatório
            birth TEXT,
            cep TEXT,
            street TEXT,
            av, etc.
            neighborhood TEXT,
            city TEXT,
            state TEXT,
            number TEXT,
            complement TEXT
            bloco, etc.
        );
        
    `);
}

/**
 *
 * @param {object} citizen
 * @param {string} citizen.cpf
 * @param {string} citizen.name
 * @param {string} citizen.birth
 * @param {string} citizen.cep
 * @param {string} citizen.street
 * @param {string} citizen.neighborhood
 * @param {string} citizen.city
 * @param {string} citizen.state
 * @param {string} citizen.number
 * @param {string} citizen.complement
 *
 * @returns {Promise}
 *
 */

export async function insertCitizen(citizen) {
  const {
    cpf,
    name,
    birth,
    cep,
    street,
    neighborhood,
    city,
    state,
    number,
    complement,
  } = citizen;

  return db.runAsync(
    `INSERT INTO citizens
        
        (cpf, name, birth, cep, street, neighborhood, city, state, number, complement) VALUES (?,?,?,?,?,?,?,?,?,?);
        `,
    [
      cpf,
      name,
      birth,
      cep,
      street,
      neighborhood,
      city,
      state,
      number,
      complement,
    ]
  );
}

/**
 *
 * @returns {Promise<Array>}
 *
 */

export async function fetchAllCitizens() {
  const result = await db.getAllAsync(`SELECT * FROM citizens ORDER BY name`);
  return result;
}

/**
 * @param {number} id
 * @returns {Promise}
 */

export async function deleteCitizen(id) {
  return db.runAsync(`DELETE FROM citizen WHERE id = ?;`, [id]);
}

/**
 * @param {number} id
 * @param {Object} citizen
 * @param {Promise}
 */

export async function updateCitizen(id, citizen) {
  const {
    cpf,
    name,
    birth,
    cep,
    street,
    neighborhood,
    city,
    state,
    number,
    complement,
  } = citizen;

  return db.runAsync(
    `UPDATE citizens
    SET cpf=?, name=?, birth=?, cep=?, street=?, neighborhood=?, city=?, state=?, number=?, complement=? WHERE id=?;
        `,
    [
      cpf,
      name,
      birth,
      cep,
      street,
      neighborhood,
      city,
      state,
      number,
      complement,
    ]
  );
}
