const { Pool } =
require("pg");

const pool =
new Pool({

 user: "postgres",

 host: "localhost",

 database:
 "nba_system",

 password:
 "kalyani",

 port: 5432

});

module.exports =
pool;