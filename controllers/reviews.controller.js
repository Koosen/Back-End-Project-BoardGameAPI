const {
  fetchReviewById,
  fetchReviews,
  fetchCommentsByReviewId,
  changeReviewVotes,
  createComment,
} = require("../models/review.model");

//controller for GET /api/reviews
exports.getReviews = (req, res, next) => {
  // get the queries from paramitors
  const { sort_by, order, category } = req.query;

  // use the model to fetch the data from the database and return data
  fetchReviews(sort_by, order, category)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch(next);
};

//controller for GET /api/reviews/:review_id
exports.getReviewById = (req, res, next) => {
  // get the ID from request paramitors
  const { review_id } = req.params;

  //use the model to fetch data from database and return data
  fetchReviewById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

//controller for PATCH /api/reviews/:review_id
exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  changeReviewVotes(review_id, inc_votes)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

//controller for GET /api/reviews/:review_id/comments
exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

//controller for POST /api/reviews/:review_id/comments
exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  createComment(username, body, review_id)
    .then((comment) => res.status(200).send({ comment }))
    .catch(next);
};
