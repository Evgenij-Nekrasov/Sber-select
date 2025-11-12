import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';

import { Data } from '../types';

const file = join(__dirname, 'db.json');
const adapter = new JSONFile<Data>(file);

const defaultData: Data = { options: [] };
const db = new Low<Data>(adapter, defaultData);

export const initializeDatabase = async () => {
  await db.read();
  db.data ||= { options: [] };
  if (db.data.options.length === 0) {
    db.data.options = Array.from({ length: 1000 }, (_, i) => ({
      name: String(i + 1),
      value: String(i + 1),
    }));
    await db.write();
  }
};

export default db;
