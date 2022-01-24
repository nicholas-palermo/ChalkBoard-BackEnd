const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Npalermo211$",
    host: "localhost",
    database: "chalkboard",
    port: 5432
});

module.exports = pool;