const {
  fetchReviewById,
  fetchReviews,
  fetchCommentsByReviewId,
  changeReviewVotes,
} = require("../models/review.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  fetchReviews(sort_by, order, category)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch(next);
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  changeReviewVotes(review_id, inc_votes)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { username, body } = req.body;
  createComment(username, body)
  .then((comment)=> res.status(200).send({comment}))
  .catch(next)
}

//refactor idea
// cb1($1, ...).then($2) => res.status(200).send({ $2 }).catch(next)