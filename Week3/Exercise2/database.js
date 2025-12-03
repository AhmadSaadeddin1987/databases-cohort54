import pg from "pg";

const client = new pg.Client({
host: "localhost",
port: 5432,
user: "hyfuser",
password: "hyfpassword",
database: "bankdb",
});

export default client;
