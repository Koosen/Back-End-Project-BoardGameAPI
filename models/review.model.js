const db = require("../db/connection");

exports.fetchReviewById = (reviewId) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${reviewId}`,
        });
      }
      return review;
    });
};

exports.fetchReviews = (sort_by, order, category) => {
  let queryStr = "SELECT * FROM reviews";
  const queryValues = [];
  const validSorts = [
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
  ];
  const validOrders = ["asc", "desc"];

  console.log(`At the start, sort_by:${sort_by}`)
  console.log(`At the start, order:${order}`)
  console.log(`At the start, category:${category}`)

  //verify sort_by is a valid property and set to default if empty
  sort_by = sort_by ? sort_by : "created_at";
  console.log(`After ternary, sort_by:${sort_by}`)
  if (![validSorts].includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  //verify order is a valid property and set to default if empty
  order = order ? order : "desc";
  console.log(`After ternary, order:${order}`)
  if (![validOrders].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  //handle category query 
  if (category) {
    queryStr += " WHERE category = $1";
    queryValues.push(category);
  }

  //handle order by query
  queryStr += `ORDER BY ${sort_by} ${order}`

  //query the database with the build SQL string
  return db.query(queryStr, queryValues)
};
