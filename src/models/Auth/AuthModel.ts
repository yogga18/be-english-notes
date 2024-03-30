import dbPool from '../../config/database';
import { ResultSetHeader } from 'mysql2';

const checkUser = async (username: string) => {
  try {
    const SQLQuery =
      'SELECT id_user, username, password, role, is_login, full_name, gender, b_day, udcr, udch FROM users WHERE username = ?';
    const values = [username];

    return await dbPool.promise().query(SQLQuery, values);
  } catch (error) {
    // Tangani kesalahan
    console.error('Error executing checkUser query:', error);
    throw new Error('Error checking user.'); // Atau pesan kesalahan yang sesuai
  }
};

const checkUserById = async (id_user: string) => {
  try {
    const SQLQuery =
      'SELECT id_user, username, password, role, is_login, full_name, gender, b_day, udcr, udch FROM users WHERE id_user = ?';
    const values = [id_user];

    return await dbPool.promise().query(SQLQuery, values);
  } catch (error) {
    // Tangani kesalahan
    console.error('Error executing checkUser query:', error);
    throw new Error('Error checking user.'); // Atau pesan kesalahan yang sesuai
  }
};

const registerUser = async (
  username: string,
  password: string,
  role: string,
  is_login: string,
  full_name: string,
  gender: string,
  b_day: string
) => {
  try {
    const SQLQuery =
      'INSERT INTO users (username, password, role, is_login, full_name, gender, b_day) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      username,
      password,
      role,
      is_login,
      full_name,
      gender,
      b_day,
    ];

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
    throw new Error('Error registering user.'); // Atau pesan kesalahan yang sesuai
  }
};

const loginUser = async (username: string, is_login: string) => {
  try {
    const SQLQuery = 'UPDATE users SET is_login = ? WHERE username = ?';
    const values = [is_login, username];

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
    // Tangani kesalahan
    console.error('Error executing loginUser query:', error);
    throw new Error('Error logging in user.'); // Atau pesan kesalahan yang sesuai
  }
};

const logoutUser = async (username: string, is_login: string) => {
  try {
    const SQLQuery = 'UPDATE users SET is_login = ? WHERE username = ?';
    const values = [is_login, username];

    return await dbPool.promise().query(SQLQuery, values);
  } catch (error) {
    // Tangani kesalahan
    console.error('Error executing logoutUser query:', error);
    throw new Error('Error logging out user.'); // Atau pesan kesalahan yang sesuai
  }
};

export { checkUser, checkUserById, registerUser, loginUser, logoutUser };
