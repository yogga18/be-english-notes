import dbPool from '../../config/database';

const getTesting = async () => {
  const SQLQuery = 'SELECT * FROM notes';

  const [rows] = await dbPool.promise().query(SQLQuery);

  return rows;
};

export { getTesting };
