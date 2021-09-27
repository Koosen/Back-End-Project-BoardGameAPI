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
    describe("Status Codes", () => {
      test("200 - when invoked", () => {
        return request(app).get("/api/categories").expect(200);
      });
    });

    describe("Returned Objects", () => {
      test('should return an object with the key "categories"', () => {
        return request(app)
          .get("/api/categories")
          .then((response) => {
            expect(Object.keys(response.body)).toEqual(["categories"]);
          });
      });

      test('should return an object with an array filled with objects with only 2 keys, "description" and "slug"', () => {
        return request(app)
          .get("/api/categories")
          .then((response) => {
            expect(Object.keys(response.body.categories[0])).toEqual([
              "slug",
              "description",
            ]);
          });
      });

      test("should return an object with an array filled with 4 objects", () => {
        return request(app)
          .get("/api/categories")
          .then((response) => {
            expect(response.body.categories.length).toBe(4);
          });
      });
    });
  });

  describe("GET /api/reviews/:review_id", () => {
    describe("Status Codes", () => {
      test("200 - when invoked with a valid review id that exists", () => {
        return request(app)
          .get("/api/reviews/2")
          .expect(200)
          .then((response) => {
            expect(response.body.review).toHaveProperty("title", "Jenga");
          });
      });

      test("400 - when invoked with a non-valid review id", () => {
        return request(app)
          .get("/api/reviews/a non valid review id")
          .expect(400);
      });

      test("404 - when invoked with a valid review id that does not exist", () => {
        return request(app).get("/api/reviews/1984").expect(404);
      });
    });

    describe("Returned Objects", () => {
      test('should return an object with the key "review"', () => {
        return request(app)
          .get("/api/reviews/2")
          .then((response) => {
            expect(Object.keys(response.body)).toEqual(["review"]);
          });
      });
    });
  });

  describe("GET /api/reviews", () => {
    test("should return status code 200 when invoked with out any queries", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          expect(response.body.reviews.length).toBe(13);
        });
    });
  });

  describe("GET /api/reviews/:review_id/comments", () => {
    describe('Status Codes', () => {
      test("200 - when invoked with a valid review_id", () => {
        return request(app)
          .get("/api/reviews/2/comments")
          .expect(200)
      });
    }); 

    describe('Returned Objects', () => {
      test("should return an object that holds an array that contains 3 objects", () => {
        return request(app)
          .get("/api/reviews/2/comments")
          .then((response) => {
            expect(response.body.comments.length).toBe(3);
          });
      });
    });
    
  });

  describe("GET /api", () => {
    describe('Status Codes', () => {
      
    });

    describe('Returned Objects', () => {
      
    });
  });

  describe("PATCH /api/reviews/:review_id", () => {
    describe('Status Codes', () => {
      
    });

    describe('Returned Objects', () => {
      
    });
  });

  describe("POST /api/reviews/:review_id/comments", () => {
    describe('Status Codes', () => {
      
    });

    describe('Returned Objects', () => {
      
    });
  });
});
