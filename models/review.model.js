const db = require("../db/connection");

//model for GET /api/review/:review_id
exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comment_id) AS comment_count
     FROM reviews 
     LEFT JOIN comments ON comments.review_id = reviews.review_id
     WHERE reviews.review_id = $1
     GROUP BY reviews.review_id
     LIMIT 1`,
      [review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`,
        });
      }
      return review;
    });
};

//model for GET /api/reviews
exports.fetchReviews = (sort_by, order, category) => {
  let queryStr = "SELECT * FROM reviews ";
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

  //verify sort_by is a valid property and set to default if empty
  sort_by = sort_by ? sort_by : "created_at";
  if (!validSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  //verify order is a valid property and set to default if empty
  order = order ? order : "desc";
  if (!validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  //handle category query
  if (category) {
    queryStr += "WHERE category = $1 ";
    queryValues.push(category);
  }

  //handle order by query
  queryStr += `ORDER BY ${sort_by} ${order};`;

  //query the database with the build SQL string
  return db.query(queryStr, queryValues).then(({ rows }) => {
    const reviews = rows;
    if (!reviews) {
      return Promise.reject({
        status: 404,
        msg: `No reviews found`,
      });
    }
    return reviews;
  });
};

//model for GET /api/reviews/:review_id/comments
exports.fetchCommentsByReviewId = (review_id) => {
  return db
    .query(
      `SELECT comment_id, author, comments.votes, comments.created_at, body
       FROM comments
       JOIN reviews
       ON comments.review_id = reviews.review_id
       WHERE comments.review_id = $1`,
      [review_id]
    )
    .then(({ rows }) => {
      const comments = rows;
      if (!comments) {
        return Promise.reject({
          status: 404,
          msg: `No comments found for review_id: ${review_id}`,
        });
      }
      return comments;
    });
};

//model for PATCH /api/review/:review_id
exports.changeReviewVotes = (review_id, inc_votes) => {
  const queryValues = [review_id, inc_votes];
  return db
    .query(
      `UPDATE reviews
      SET votes = votes + $2
      WHERE review_id = $1
      RETURNING *`,
      queryValues
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`,
        });
      }
      return review;
    });
};

//model for POST /api/review/:review_id/comments
exports.createComment = (username, body, review_id) => {
  const commentValues = [username, review_id, body]
  return db
    .query(
      `INSERT INTO comments (author, review_id, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      commentValues
    )
    .then((result) => result.rows);
};
