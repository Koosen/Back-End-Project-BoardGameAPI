//import all controller functions from category controller
const { getCategories } = require("./category.controller");

//import all controller functions from review controller
const {
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  patchReviewVotes,
  postComment,
} = require("./reviews.controller");

//import all controller functions from api controller
const { getEndpoints } = require("./api.controller");

/*export all controller functions on one object for 
cleaner importing in app.js*/
module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewId,
  patchReviewVotes,
  getEndpoints,
  postComment,
};
