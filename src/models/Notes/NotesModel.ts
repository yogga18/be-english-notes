import dbPool from '../../config/database';

const getAllNotes = async (id_user: string) => {
  try {
    const SQLQuery =
      'SELECT id_note, id_user, title, terjemahan, word, udcr, udch FROM notes WHERE id_user = ?';

    const values = [id_user];

    const [rows] = await dbPool.promise().query(SQLQuery, values);

    return rows;
  } catch (error) {
    throw new Error('Error getting all notes.');
  }
};

const getNoteById = async (id_note: string, id_user: string) => {
  try {
    const SQLQuery =
      'SELECT id_note, id_user, title, terjemahan, word, udcr, udch FROM notes WHERE id_note = ? AND id_user = ?';

    const values = [id_note, id_user];

    const [rows] = await dbPool.promise().query(SQLQuery, values);

    return rows;
  } catch (error) {
    throw new Error('Error getting note by id.');
  }
};

const createNote = async (
  id_user: string,
  title: string,
  terjemahan: string,
  word: string
) => {
  try {
    const SQLQuery =
      'INSERT INTO notes (id_user, title, terjemahan, word) VALUES (?, ?, ?, ?)';

    const values = [id_user, title, terjemahan, word];

    const [rows] = await dbPool.promise().query(SQLQuery, values);

    return rows;
  } catch (error) {
    throw new Error('Error creating note.');
  }
};

const deleteNote = async (id_note: string, id_user: string) => {
  try {
    const SQLQuery = 'DELETE FROM notes WHERE id_note = ? AND id_user = ?';

    const values = [id_note, id_user];

    const [rows] = await dbPool.promise().query(SQLQuery, values);

    return rows;
  } catch (error) {
    throw new Error('Error deleting note.');
  }
};

const updateNote = async (
  id_user: string,
  id_note: string,
  title: string,
  terjemahan: string,
  word: string
) => {
  try {
    const SQLQuery =
      'UPDATE notes SET title = ?, terjemahan = ?, word = ? WHERE id_note = ? AND id_user = ?';

    const values = [title, terjemahan, word, id_note, id_user];

    const [rows] = await dbPool.promise().query(SQLQuery, values);

    return rows;
  } catch (error) {
    throw new Error('Error updating note.');
  }
};

export { getAllNotes, getNoteById, createNote, deleteNote, updateNote };
