const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "leetcode_clon",
  password: "rated rko",
  port: 5432,
});

module.exports = pool;