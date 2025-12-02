import client from "./database.js";

async function createAuthorsTable() {
try {
await client.connect();
console.log("Connected to Ahmaddb");


await client.query(`
    DROP TABLE IF EXISTS authors CASCADE;
`);
console.log("Dropped old table (if existed)");

await client.query(`
    CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    university VARCHAR(100),
    h_index INT,
    gender VARCHAR(20)
    );
`);
console.log("Created table: authors");


await client.query(`
    ALTER TABLE authors
    ADD COLUMN mentor INT;
`);
console.log("Added column: mentor");


await client.query(`
    ALTER TABLE authors
    ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id)
    ON DELETE SET NULL;
`);
console.log("Added foreign key: mentor → authors.author_id");

} catch (err) {
console.error("Error:", err);
} finally {
await client.end();
console.log("Connection closed");
}
}

createAuthorsTable();
