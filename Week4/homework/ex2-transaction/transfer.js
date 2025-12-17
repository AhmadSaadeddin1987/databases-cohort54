import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export async function transferAmount(fromAcc, toAcc, amount, remark = "") {
await client.connect();
const session = client.startSession();

try {
const db = client.db("databaseWeek4");
const accounts = db.collection("accounts");

await session.withTransaction(async () => {
    // Get current accounts
    const fromAccount = await accounts.findOne({ account_number: fromAcc }, { session });
    const toAccount = await accounts.findOne({ account_number: toAcc }, { session });

    // Determine next change_number
    const fromChangeNumber = fromAccount.account_changes.length > 0
    ? fromAccount.account_changes[fromAccount.account_changes.length - 1].change_number
    : 0;

    const toChangeNumber = toAccount.account_changes.length > 0
    ? toAccount.account_changes[toAccount.account_changes.length - 1].change_number
    : 0;

    // Deduct from sender
    await accounts.updateOne(
    { account_number: fromAcc },
    { $inc: { balance: -amount } },
    { session }
    );

    // Add to receiver
    await accounts.updateOne(
    { account_number: toAcc },
    { $inc: { balance: amount } },
    { session }
    );

    // Log changes in account_changes array
    await accounts.updateOne(
    { account_number: fromAcc },
    {
        $push: {
        account_changes: {
            change_number: fromChangeNumber + 1,
            amount: -amount,
            changed_date: new Date(),
            remark: remark || `Transferred ${amount} to account ${toAcc}`
        }
        }
    },
    { session }
    );

    await accounts.updateOne(
    { account_number: toAcc },
    {
        $push: {
        account_changes: {
            change_number: toChangeNumber + 1,
            amount: amount,
            changed_date: new Date(),
            remark: remark || `Received ${amount} from account ${fromAcc}`
        }
        }
    },
    { session }
    );
});

console.log(`Transaction successful: ${amount} transferred from ${fromAcc} to ${toAcc}`);
} catch (err) {
console.error("Transaction failed:", err);
} finally {
await session.endSession();
await client.close();
}
}
