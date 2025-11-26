import client from './database.js';

async function main() {
await client.connect();

try {
console.log("\nPapers and number of authors:");
let q1 = await client.query(`
    SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
    FROM research_papers rp
    LEFT JOIN author_papers ap ON rp.paper_id = ap.paper_id
    GROUP BY rp.paper_id;
`);
console.table(q1.rows);

console.log("\nTotal papers by female authors:");
let q2 = await client.query(`
    SELECT COUNT(ap.paper_id) AS total_female_papers
    FROM author_papers ap
    JOIN authors a ON ap.author_id = a.author_id
    WHERE a.gender = 'female';
`);
console.table(q2.rows);

console.log("\nAverage h-index per university:");
let q3 = await client.query(`
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;
`);
console.table(q3.rows);

console.log("\nTotal papers per university:");
let q4 = await client.query(`
    SELECT a.university, COUNT(ap.paper_id) AS total_papers
    FROM authors a
    LEFT JOIN author_papers ap ON a.author_id = ap.author_id
    GROUP BY a.university;
`);
console.table(q4.rows);

console.log("\nMin/Max h-index per university:");
let q5 = await client.query(`
    SELECT university, MIN(h_index) AS min_h, MAX(h_index) AS max_h
    FROM authors
    GROUP BY university;
`);
console.table(q5.rows);

} catch (err) {
console.error(err);
} finally {
await client.end();
}
}

main();
