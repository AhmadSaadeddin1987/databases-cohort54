import pkg from "pg";
const { Client } = pkg;

const client = new Client({
user: "hyfuser",
host: "localhost",
database: "Ahmaddb",
password: "hyfpassword",
port: 5432,
});

export default client;
