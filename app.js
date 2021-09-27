const express = require("express");
const app = express();

const {
  getCategories,
  getReviewById,
  getReviews,
  getCommentsByReviewId,
  getEndpoints,
  patchReviewVotes,
  postComment,
} = require("./controllers");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors");

app.use(express.json())

// route into /api
app.get("/api", getEndpoints);
app.get("/api/categories", getCategories);

// route into /api/reviews
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReviewVotes);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.post("/api/reviews/:review_id/comments", postComment)

//refactor into 1 line by moving to one file?
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
