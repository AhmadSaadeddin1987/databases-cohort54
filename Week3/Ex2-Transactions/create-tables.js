import client from "./database.js";

async function createTables() {
await client.connect();

try {
await client.query(`
    CREATE TABLE IF NOT EXISTS account (
    account_number INT PRIMARY KEY,
    balance NUMERIC(12,2) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS account_changes (
    change_number SERIAL PRIMARY KEY,
    account_number INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    changed_date TIMESTAMP DEFAULT NOW(),
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES account(account_number)
    );
`);

console.log("Tables created successfully");
} catch (err) {
console.error("Error creating tables:", err);
} finally {
await client.end();
}
}

createTables();
