//controller for GET /api
exports.getEndpoints = (req, res) => {
  const endPoints = {
    endPoints:
      "End points are; /api/categories /api/reviews /api/reviews/:review_id /api/reviews/:review_id /api/reviews/:review_id/comments /api/reviews/:review_id/comments",
  };
  res.status(200).send({ endPoints });
};
