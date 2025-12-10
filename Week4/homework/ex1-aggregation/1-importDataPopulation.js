import fs from "fs";
import csv from "csv-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
try {
await client.connect();
console.log("Connected to MongoDB");

const db = client.db("databaseWeek4");
const collection = db.collection("population");

const results = [];

fs.createReadStream("./homework/ex1-aggregation/population_pyramid_1950-2022.csv")
    .pipe(csv())
    .on("data", (row) => {
    results.push({
        Country: row.Country,
        Year: Number(row.Year),
        Age: row.Age,
        M: Number(row.M),
        F: Number(row.F),
    });
    })
    .on("end", async () => {
    const inserted = await collection.insertMany(results);
    console.log("Inserted:", inserted.insertedCount, "documents");
    await client.close();
    });

} catch (err) {
console.error(err);
}
}

run();
