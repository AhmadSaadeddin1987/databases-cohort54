// Async function to get population of a country by name and code
async function getPopulation(countryTable, name, code) {
const sql = `
SELECT population
FROM ${countryTable}
WHERE name = $1 AND code = $2
`;
const values = [name, code];

const result = await client.query(sql, values);

if (!result || result.rows.length === 0) {
throw new Error('Not found');
}

return result.rows[0].population;
}