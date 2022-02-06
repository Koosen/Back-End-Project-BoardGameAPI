# BE Northcoders NC Games Portfolio Check List
​
## Readme - Remove the one that was provided and write your own:
​
- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project
​
## General
​
- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [✓] .gitignore the `.env` files
​
## Connection to db
​
- [✓] Throw error if `process.env.PGDATABASE` is not set
​
**Needs to be set up for production - see notes on Hosting with Heroku**
​
## Creating tables
​
- [✓] Use `NOT NULL` on required fields
- [ ] Default `created_at` in reviews and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [ ] Delete all comments when the review they are related to is deleted: Add `ON DELETE CASCADE` to `review_id` column in `comments` table.
​
## Inserting data
​
- [ ] Make sure util functions do not mutate data
- [ ] Make util functions easy to follow with well named functions and variables
- [ ] Test util functions
- [✓] Drop tables and create tables in seed function
​
**No utils functions or testing for utils functions**
​
## Tests
​
- [✓] Seeding before each test
- [ ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [✓] Ensure all tests are passing
- [ ] Cover all endpoints and errors
​
- `GET /api/categories`
​
  - [✓] Status 200, array of category objects
​
**Nice test cases on 200 route**
​
- `GET /api/reviews/:review_id`
​
  - [✓] Status 200, single review object (including `comment_count`)
  - [✓] Status 400, invalid ID, e.g. string of "not-an-id"
  - [✓] Status 404, non existent ID, e.g. 0 or 9999
​
**On 400 and 404 console.log(response.body) to see the error message from these and .expect the error message for clarity**
​
- `PATCH /api/reviews/:review_id`
​
  - [ ] Status 200, updated single review object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing
​
- `GET /api/reviews`
​
  - [ ] Status 200, array of review objects (including `comment_count`, excluding `body`)
  - [ ] Status 200, default sort & order: `created_at`, `desc`
  - [ ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ ] Status 200, accepts `category` query, e.g. `?category=dexterity`
  - [ ] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ ] Status 404. non-existent `category` query, e.g. `?category=bananas`
  - [ ] Status 200. valid `category` query, but has no reviews responds with an empty array of reviews, e.g. `?category=children's games`
​
**Utils functions will be required to remove the body and add comment count here.**
**You've got the logic for the queries in the model, it just needs to be tested for each query**
​
- `GET /api/reviews/:review_id/comments`
​
  - [ ] Status 200, array of comment objects for the specified review
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments
​
**Needs to test equality with a matched comments object on status 200**
​
- `POST /api/reviews/:review_id/comments`
​
  - [ ] Status 201, created comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties
​
- `GET /api`
​
  - [ ] Status 200, JSON describing all the available endpoints
​
**Some more comprehensive testing required to cover all endpoints. All current tests are passing.**
**Refer to the Jest docs for toMatchObject to dynamically test matching objects using forEach. I can go over this with you if that would be useful.**
​
## Routing
​
- [ ] Split into api, categories, users, comments and reviews routers
- [ ] Use `.route` for endpoints that share the same path
​
**Currently all routed through app - would recommend exporting to routers including api router for clarity and reduce the number of controllers.**
**Can also shorthand routing by using .route eg app.route('/api/reviews/:review_id').get(getCategories).patch(updateReview)**
​
## Controllers
​
- [✓] Name functions and variables well
- [✓] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)
​
## Models
​
- Protected from SQL injection
  - [✓] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [✓] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [✓] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts
​
**Be careful with naming conventions here - use reviews and comments over re and co**
**LEFT JOIN will give access to the single column from reviews rather than the whole reviews table**
​
## Errors
​
- [✓] Use error handling middleware functions in app and extracted to separate directory/file
- [✓] Consistently use `Promise.reject` in either models _**OR**_ controllers
​
**Some good work here, Richard. I can see that you've put the describe blocks in for all of the necessary endpoints 
but haven't yet had chance to fill them in. I'd concentrate on this first as you already have the bulk of the logic 
in your models using greenlisting and query string which is great.**
**Error handling is good but will need testing on your endpoints for 400s and some more 404s**
**You'll need to write some util functions and tests to format the response body of the /api/reviews endpoint**
**Let me know if you want to go over anything. I'm happy to give this another look over for you when you've got all 
of the necessary endpoints tested and in place. I'm confident that you can do this, however if you don't have 
everything set up before your Front End project we can provide a Back End for you to use.**