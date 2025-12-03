import client from "./database.js";

async function doTransaction() {
await client.connect();

try {
await client.query("BEGIN");

const amount = 1000;
const fromAcc = 101;
const toAcc = 102;

// 1. Subtract from account 101
await client.query(
    `UPDATE account SET balance = balance - $1 WHERE account_number = $2`,
    [amount, fromAcc]
);

await client.query(
    `INSERT INTO account_changes (account_number, amount, remark)
    VALUES ($1, $2, 'Transfer to 102')`,
    [fromAcc, -amount]
);

// 2. Add to account 102
await client.query(
    `UPDATE account SET balance = balance + $1 WHERE account_number = $2`,
    [amount, toAcc]
);

await client.query(
    `INSERT INTO account_changes (account_number, amount, remark)
    VALUES ($1, $2, 'Transfer from 101')`,
    [toAcc, amount]
);

// If everything is OK → commit
await client.query("COMMIT");
console.log("Transaction completed successfully");

} catch (err) {
console.error("Transaction failed:", err);
await client.query("ROLLBACK");
} finally {
await client.end();
}
}

doTransaction();
