const format = require("pg-format");
const db = require("../connection"); 

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return (
    db

      //delete the tables in the database
      .query("DROP TABLE IF EXISTS comments, reviews, users, categories")

      //Create the "categories" table
      .then(() => {
        return db.query(`
          CREATE TABLE categories (
            slug VARCHAR(64) PRIMARY KEY,
            description TEXT NOT NULL 
          )
        `);
      })

      //Create the "users" table
      .then(() => {
        return db.query(`
          CREATE TABLE users (
            username VARCHAR(64) PRIMARY KEY,
            avatar_url VARCHAR(256),
            name VARCHAR(128) NOT NULL  
          )
        `);
      })

      //Create the "reviews" table
      .then(() => {
        return db.query(`
          CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            title VARCHAR(256) NOT NULL,
            review_body TEXT NOT NULL,
            designer VARCHAR(128) NOT NULL,
            review_img_url VARCHAR(258),
            votes INT,
            category VARCHAR(64) REFERENCES categories(slug),
            owner VARCHAR(64) REFERENCES users(username),
            created_at DATE
          )
        `);
      })

      //Create the "comments" table
      .then(() => {
        return db.query(`
          CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            author VARCHAR(64) REFERENCES users(username),
            review_id INT REFERENCES reviews(review_id),
            votes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            body TEXT NOT NULL
          )
        `);
      })

      //fill the "categories" table with data
      .then(() => {
        const categoryQueryStr = format(
          `INSERT INTO categories
          (slug, description)
          VALUES
          %L
          RETURNING *`,
          categoryData.map((category) => [category.slug, category.description])
        );
        return db.query(categoryQueryStr);
      })

      //fill the "users" table with data
      .then(() => {
        const userQueryStr = format(
          `INSERT INTO users
          (username, avatar_url, name)
          VALUES
          %L
          RETURNING *`,
          userData.map((user) => [user.username, user.avatar_url, user.name])
        );
        return db.query(userQueryStr);
      })

      //fill the "reviews" table with data
      .then(() => {
        const reviewQueryStr = format(
          `INSERT INTO reviews
          (title, review_body, designer, review_img_url,
             votes, category, owner, created_at)
          VALUES
          %L
          RETURNING *`,
          reviewData.map((review) => [
            review.title,
            review.review_body,
            review.designer,
            review.review_img_url,
            review.votes,
            review.category,
            review.owner,
            review.created_at,
          ])
        );
        return db.query(reviewQueryStr);
      })

      //fill the "comments" table with data
      .then(() => {
        const commentQueryStr = format(
          `INSERT INTO comments
          (author, review_id, votes, created_at, body)
          VALUES
          %L
          RETURNING *`,
          commentData.map((comment) => [
            comment.author,
            comment.review_id,
            comment.votes,
            comment.created_at,
            comment.body,
          ])
        );
        return db.query(commentQueryStr);
      })
  );
};

module.exports = seed;
