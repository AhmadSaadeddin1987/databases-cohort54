import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export async function setup() {
try {
await client.connect();
const db = client.db("databaseWeek4");
const accounts = db.collection("accounts");
const accountChanges = db.collection("account_changes");

// Clear previous data
await accounts.deleteMany({});

await accountChanges.deleteMany({});

// Insert sample accounts
await accounts.insertMany([
    { account_number: 101, balance: 5000, account_changes: [] },
    { account_number: 102, balance: 3000, account_changes: [] }
]);

console.log("Setup done: accounts created with account_changes array.");
} catch (err) {
console.error(err);
} finally {
await client.close();
}
}

