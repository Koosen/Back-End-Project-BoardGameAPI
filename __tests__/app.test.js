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
    test("should return status code 200", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((response) => {
          expect(response.body.categories.length).toBe(4);
        });
    });

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
  });

  describe("GET /api/reviews/:review_id", () => {
    test("should return status code 200 when invoked with a valid review id that exists", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then((response) => {
          expect(response.body.review).toHaveProperty("title", "Jenga");
        });
    });

    test("should return status code 400 when invoked with a non-valid review id", () => {
      return request(app).get("/api/reviews/a non valid review id").expect(400);
    });

    test("should return status code 404 when invoked with a valid review id that does not exist", () => {
      return request(app).get("/api/reviews/1984").expect(404);
    });

    test('should return an object with the key "review"', () => {
      return request(app)
        .get("/api/reviews/2")
        .then((response) => {
          expect(Object.keys(response.body)).toEqual(["review"]);
        });
    });
  });

  describe('GET /api/reviews', () => {
    
  });
});
