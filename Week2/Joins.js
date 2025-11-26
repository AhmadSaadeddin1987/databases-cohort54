import client from './database.js';

async function main() {
await client.connect();

try {
console.log("\nAuthors and their mentors:");
let res1 = await client.query(`
    SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
`);
console.table(res1.rows);

console.log("\nAuthors and their paper titles:");
let res2 = await client.query(`
    SELECT a.author_name, rp.paper_title
    FROM authors a
    LEFT JOIN author_papers ap ON a.author_id = ap.author_id
    LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
`);
console.table(res2.rows);
} catch (err) {
console.error(err);
} finally {
await client.end();
}
}

main();
