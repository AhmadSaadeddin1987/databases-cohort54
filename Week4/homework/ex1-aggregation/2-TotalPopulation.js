import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function getPopulationByCountry(countryName) {
try {
await client.connect();
const db = client.db("databaseWeek4");
const collection = db.collection("population");

const result = await collection.aggregate([
    { $match: { Country: countryName } },
    { 
    $group: { 
        _id: "$Year", 
        countPopulation: { $sum: { $add: ["$M", "$F"] } } 
    } 
    },
    { $sort: { _id: 1 } }
]).toArray();

return result;

} catch (err) {
console.error(err);
} finally {
await client.close();
}
}

// Example usage:
getPopulationByCountry("Netherlands").then(res => console.log(res));
