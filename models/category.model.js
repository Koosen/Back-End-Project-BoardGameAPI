const db = require('../db/connection')

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then((result) => result.rows);
};
