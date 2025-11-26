import client from './database.js';

async function main() {
await client.connect();

try {

await client.query(`
    CREATE TABLE IF NOT EXISTS research_papers (
    paper_id SERIAL PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(100),
    publish_date DATE
    );
`);


await client.query(`
    CREATE TABLE IF NOT EXISTS author_papers (
    author_id INT REFERENCES authors(author_id),
    paper_id INT REFERENCES research_papers(paper_id),
    PRIMARY KEY (author_id, paper_id)
    );
`);


await client.query(`
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES 
    ('Ali Hassan', 'Damascus University', '1980-01-10', 20, 'male', NULL),
    ('Sara Ahmed', 'TU Delft', '1985-03-20', 25, 'female', 1),
    ('John doe', 'Utrecht University', '1978-04-11', 30, 'male', NULL),
    ('Mona Ali', 'Utrecht University', '1990-06-09', 19, 'female', 3),
    ('Peter Green', 'Leiden University', '1981-07-17', 15, 'male', NULL),
    ('Layla Noor', 'Leiden University', '1988-05-14', 22, 'female', 5),
    ('Omar Yusuf', 'VU Amsterdam', '1975-10-30', 40, 'male', NULL),
    ('Noor Saleh', 'VU Amsterdam', '1992-02-02', 12, 'female', 7),
    ('David Smith', 'TU Eindhoven', '1983-09-18', 28, 'male', NULL),
    ('Emily Rose', 'TU Eindhoven', '1991-11-13', 27, 'female', 9),
    ('Khalid Ali', 'TU Delft', '1984-01-20', 18, 'male', 1),
    ('Maya Fahmi', 'Utrecht University', '1993-03-21', 14, 'female', 3),
    ('Tom Klein', 'Leiden University', '1979-04-12', 33, 'male', 5),
    ('Aisha Zain', 'VU Amsterdam', '1987-12-09', 21, 'female', 7),
    ('George Brown', 'TU Eindhoven', '1990-05-05', 17, 'male', 9);
`);

// Insert research papers
await client.query(`
    INSERT INTO research_papers (paper_title, conference, publish_date)
    VALUES
    ('AI in Robotics', 'ICRA', '2021-05-10'),
    ('Quantum Computing Models', 'QCE', '2022-09-14'),
    ('Autonomous Vehicles', 'CVPR', '2023-06-22'),
    ('Big Data in Healthcare', 'IEEE HealthCom', '2020-11-01'),
    ('Deep Learning Optimization', 'NeurIPS', '2023-12-01'),
    ('Machine Ethics', 'AAAI', '2021-02-15'),
    ('Smart Cities IoT', 'IEEE IoT', '2022-07-17'),
    ('Cloud Security Architecture', 'ACM CCS', '2021-10-10'),
    ('5G Network Analysis', 'IEEE GlobeCom', '2022-03-11'),
    ('Blockchain Privacy', 'Crypto', '2023-08-19'),
    ('Energy-Efficient AI', 'NeurIPS', '2021-12-05'),
    ('Natural Language Processing', 'ACL', '2022-06-06'),
    ('VR Rehabilitation', 'SIGGRAPH', '2020-08-10'),
    ('Brain-Computer Interfaces', 'EMBC', '2023-07-01'),
    ('Bioinformatics Algorithms', 'ISMB', '2021-09-02'),
    ('Human-AI Interaction', 'CHI', '2023-04-12'),
    ('Cyber Forensics', 'DFRWS', '2021-06-03'),
    ('Neural Networks Hardware', 'ICLR', '2022-05-05'),
    ('Robotics Vision', 'ICRA', '2021-04-18'),
    ('Smart Agriculture', 'AgriTech', '2023-02-14'),
    ('Edge Computing', 'IEEE Edge', '2020-07-07'),
    ('AI Governance', 'AAAI', '2022-11-11'),
    ('Wireless Sensor Networks', 'INFOCOM', '2023-01-01'),
    ('Medical Imaging AI', 'MICCAI', '2021-09-01'),
    ('Genomics Deep Learning', 'ISMB', '2022-05-15'),
    ('3D Printing Materials', '3DPC', '2020-04-21'),
    ('Augmented Reality Interfaces', 'UIST', '2023-10-10'),
    ('Cybersecurity Threat Models', 'BlackHat', '2022-08-08'),
    ('Data Mining Techniques', 'KDD', '2021-07-07'),
    ('Robotics Navigation', 'ICRA', '2023-03-03');
`);

// Link authors ↔ papers
await client.query(`
    INSERT INTO author_papers VALUES
    (1,1),(1,3),(1,5),
    (2,1),(2,4),(2,6),
    (3,2),(3,7),(3,8),
    (4,7),(4,10),(4,11),
    (5,9),(5,14),
    (6,3),(6,12),
    (7,1),(7,18),
    (8,16),
    (9,5),(9,13),(9,20),
    (10,4),(10,21),
    (11,3),(11,22),
    (12,12),(12,25),
    (13,14),(13,26),
    (14,17),(14,28),
    (15,30),(15,27);
`);

console.log("Exercise 2: relationships && data inserted");
} catch (err) {
console.error(err);
} finally {
await client.end();
}
}

main();
