const { fetchReviewById, fetchReviews } = require("../models/review.model");

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
