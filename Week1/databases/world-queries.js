const { Client } = require("pg");

// Connect to the world database
const client = new Client({
user: "hyfuser",
host: "localhost",
database: "world",
password: "hyfpassword",
port: 5432,
});

async function main() {
try {
await client.connect();
console.log("Connected to world database\n");

// 1-Countries with population > 8 million
const q1 = await client.query(`
    SELECT Name FROM country WHERE Population > 8000000;
`);
console.log("1. Countries with population > 8 million:");
console.table(q1.rows);

// 2-Countries with "land" in their name
const q2 = await client.query(`
    SELECT Name FROM country WHERE Name LIKE '%land%';
`);
console.log('2. Countries with "land" in their name:');
console.table(q2.rows);

// 3-Cities with population between 500,000 and 1 million
const q3 = await client.query(`
    SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;
`);
console.log("3. Cities with population 500k–1M:");
console.table(q3.rows);

// 4-Countries in Europe
const q4 = await client.query(`
    SELECT Name FROM country WHERE Continent = 'Europe';
`);
console.log("4. Countries in Europe:");
console.table(q4.rows);

// 5-Countries descending by surface area
const q5 = await client.query(`
    SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;
`);
console.log("5. Countries by surface area (desc):");
console.table(q5.rows);

// 6-Cities in the Netherlands
const q6 = await client.query(`
    SELECT Name FROM city 
    WHERE CountryCode = 'NLD';
`);
console.log("6. Cities in the Netherlands:");
console.table(q6.rows);

// 7-Population of Rotterdam
const q7 = await client.query(`
    SELECT Population FROM city WHERE Name = 'Rotterdam';
`);
console.log("7. Population of Rotterdam:", q7.rows[0].population);

// 8- Top 10 countries by surface area
const q8 = await client.query(`
    SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;
`);
console.log("8. Top 10 countries by surface area:");
console.table(q8.rows);

// 9- Top 10 most populated cities
const q9 = await client.query(`
    SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;
`);
console.log("9. Top 10 most populated cities:");
console.table(q9.rows);

// 10- Total population of the world
const q10 = await client.query(`
    SELECT SUM(population) AS world_population FROM country;
`);
console.log("10. Total world population:", q10.rows[0].world_population);

} catch (err) {
console.error("ERROR:", err);
} finally {

await client.end();
console.log("Database connection closed.");
}
}

main();

