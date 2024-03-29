const { fetchCategories } = require("../models/category.model");

//controller for GET /api/categories
exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
