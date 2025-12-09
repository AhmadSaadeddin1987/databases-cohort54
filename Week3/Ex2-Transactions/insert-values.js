import client from "./database.js";

async function insertValues() {
await client.connect();

try {
await client.query(`
    INSERT INTO account (account_number, balance)
    VALUES
    (101, 5000),
    (102, 3000)
    ON CONFLICT (account_number) DO NOTHING;
`);

console.log("Sample accounts inserted");

} catch (err) {
console.error("Error inserting values:", err);
} finally {
await client.end();
}
}

insertValues();
