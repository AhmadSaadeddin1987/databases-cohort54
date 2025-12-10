import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export async function transferAmount(fromAcc, toAcc, amount) {
const session = client.startSession();

try {
await client.connect();
const db = client.db("databaseWeek4");
const accounts = db.collection("accounts");
const accountChanges = db.collection("account_changes");

await session.withTransaction(async () => {
    // Deduct from sender
    const fromResult = await accounts.updateOne(
    { account_number: fromAcc },
    { $inc: { balance: -amount } },
    { session }
    );

    // Add to receiver
    const toResult = await accounts.updateOne(
    { account_number: toAcc },
    { $inc: { balance: amount } },
    { session }
    );

    // Log changes
    await accountChanges.insertMany([
    {
        account_number: fromAcc,
        amount: -amount,
        changed_date: new Date(),
        remark: `Transferred ${amount} to account ${toAcc}`
    },
    {
        account_number: toAcc,
        amount: amount,
        changed_date: new Date(),
        remark: `Received ${amount} from account ${fromAcc}`
    }
    ], { session });
});

console.log(`Transaction successful: ${amount} transferred from ${fromAcc} to ${toAcc}`);
} catch (err) {
console.error("Transaction failed:", err);
} finally {
await session.endSession();
await client.close();
}
}
