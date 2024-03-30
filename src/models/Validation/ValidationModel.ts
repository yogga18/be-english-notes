import { ResultSetHeader } from 'mysql2';
import dbPool from '../../config/database';

const insertValidation = async (
  id_user: string,
  email: string,
  phone_number: string
) => {
  try {
    const SQLQuery =
      'INSERT INTO validation (id_user, email, phone_number) VALUES (?, ?, ?)';

    const values = [id_user, email, phone_number];

    const [result] = await dbPool.promise().query(SQLQuery, values);
    const { affectedRows } = result as ResultSetHeader;

    if (affectedRows && affectedRows > 0) {
      return {
        result: result,
        signal: true,
      };
    } else {
      return {
        result: result,
        signal: false,
      };
    }
  } catch (error) {
    throw new Error('Error inserting validation.');
  }
};

const checkValidation = async (id_user: string) => {
  try {
    const SQLQuery =
      'SELECT id_validation ,id_user, email, phone_number FROM validation WHERE id_user = ?';
    const values = [id_user];

    // return data
    return await dbPool.promise().query(SQLQuery, values);
  } catch (error) {
    console.error('Error executing checkValidation query:', error);
    throw new Error('Error checking validation.');
  }
};

export { insertValidation, checkValidation };
