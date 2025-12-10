import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);


async function getContinentPopulationByYearAndAge(year, age) {
try {
await client.connect();
const db = client.db("databaseWeek4");
const collection = db.collection("population");

const result = await collection.aggregate([
    { $match: { Year: year, Age: age } },
    { $addFields: { TotalPopulation: { $add: ["$M", "$F"] } } },
    { $sort: { Country: 1 } }
]).toArray();

return result;

} catch (err) {
console.error("Error:", err);
} finally {
await client.close();
}
}

// Example usage:
getContinentPopulationByYearAndAge(2020, "100+").then(res => console.log(res));
