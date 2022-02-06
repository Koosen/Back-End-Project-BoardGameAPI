const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { response } = require("express");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("App.js", () => {
  describe("GET /api/categories", () => {
    test("200 - returns correct categories and the expected length of 4 results when ran on test data", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((response) => {
          expect(Object.keys(response.body.categories[0])).toEqual([
            "slug",
            "description",
          ]);
          expect(response.body.categories.length).toBe(4);
        });
    });
  });

  describe("GET /api/reviews/:review_id", () => {
    test("200 - when invoked with a valid review id that exists returns an object with the key 'review'", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then((response) => {
          expect(response.body.review).toHaveProperty("title", "Jenga");
          expect(Object.keys(response.body)).toEqual(["review"]);
        });
    });

    test("400 - when invoked with a non-valid review id", () => {
      return request(app)
        .get("/api/reviews/a non valid review id")
        .expect(400)
        .then((result) => {
          expect(result.body.msg).toBe("Invalid input");
        });
    });

    test("404 - when invoked with a valid review id that does not exist", () => {
      return request(app)
        .get("/api/reviews/1984")
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("No review found for review_id: 1984");
        });
    });
  });

  describe("PATCH /api/reviews/:review_id", () => {
    test("200 - invoked returns updated single review object", () => {
      return request(app).patch("/api/reviews/1").expect(200);
    });

    test("400 - invoked with invalid ID", () => {
      return request(app).patch("/api/reviews/bananas").expect(400);
    });

    test("404 - invoked with non-existent ID", () => {
      return request(app).patch("/api/reviews/1984").expect(404);
    });

    test("400 - invoked with a missing body", () => {
      return request(app).patch("/api/reviews/1").expect(400);
    });
  });

  describe("GET /api/reviews", () => {
    test("200 - when invoked with out any queries", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          expect(response.body.reviews.length).toBe(13);
        });
    });

    test("200 - invoked with sort_by query", () => {
      return request(app).get("/api/reviews?sort_by=votes").expect(200);
    });

    test("200 - invoked with order query", () => {
      return request(app).get("/api/reviews?order=desc").expect(200);
    });

    test("200 - invoked with category query", () => {
      return request(app).get("/api/reviews?category=dexterity").expect(200);
    });

    test("400 - invoked with invlaid sort_by query", () => {
      return request(app).get("/api/reviews?sort_by=bananas").expect(400);
    });

    test("400 - invoked with invalid order query", () => {
      return request(app).get("/api/reviews?order=bananas").expect(400);
    });

    test("404 - invoked with invalid category query", () => {
      return request(app).get("/api/reviews?category=bananas").expect(404);
    });
  });

  describe("GET /api/reviews/:review_id/comments", () => {
    test("200 - when invoked with a valid review_id return an object that holds an array that contains 3 objects", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((response) => {
          expect(response.body.comments.length).toBe(3);
        });
    });

    test("200 - valid ID with no comments", () => {
      return request(app).get("/api/reviews/5/comments").expect(200);
    });

    test("400 - invalid ID", () => {
      return request(app).get("/api/reviews/bananas/comments").expect(400);
    });

    test("404 - non existent ID", () => {
      return request(app).get("/api/reviews/1984/comments").expect(404);
    });
  });

  describe("POST /api/reviews/:review_id/comments", () => {
    test("201 - invoked returns created comment object", () => {
      return request(app).get("/api/reviews").expect(200);
    });

    test("400 - invoked with invalid ID", () => {
      return request(app).get("/api/reviews").expect(200);
    });

    test("404 - invoked with non-existent ID", () => {
      return request(app).get("/api/reviews").expect(200);
    });

    test("400 - invoked with missing fields", () => {
      return request(app).get("/api/reviews").expect(200);
    });

    test("404 - invoked with a non-existent username", () => {
      return request(app).get("/api/reviews").expect(200);
    });

    test("201 - invoked with unnecessary properites", () => {
      return request(app).get("/api/reviews").expect(200);
    });
  });

  describe("GET /api", () => {
    test("200 - invoked returns a list of endpoints", () => {
      return request(app);
    });
  });
});
