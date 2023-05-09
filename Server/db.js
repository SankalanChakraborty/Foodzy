const Pool = require("pg").Pool;

const pool = new Pool({
  user: "sanju",
  password: "postgres",
  host: "localhost",
  post: 5432,
  database: "meals",
});

module.exports = pool;
