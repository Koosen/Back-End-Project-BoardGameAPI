const { getCategories } = require("./category.controller");
const {
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  postCommentsByReviewId,
  patchReviewById,
} = require("./reviews.controller");
const { getEndpoints } = require("./api.controller");

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  postCommentsByReviewId,
  patchReviewById,
  getEndpoints
};
