const { Client } = require("pg");

// Connect first to postgres database to create meetup database
const createDbClient = new Client({
user: "hyfuser",
host: "localhost",
database: "postgres",
password: "hyfpassword",
port: 5432,
});

// Function to create the meetup DB
async function createDatabase() {
await createDbClient.connect();

// Drop DB if exists and create again
await createDbClient.query("DROP DATABASE IF EXISTS meetup;");
await createDbClient.query("CREATE DATABASE meetup;");

await createDbClient.end();
console.log("meetup database created");
}

// Now connect to the meetup DB to create tables
async function setupTables() {
const client = new Client({
user: "hyfuser",
host: "localhost",
database: "meetup",
password: "hyfpassword",
port: 5432,
});

await client.connect();

// Drop tables if exist
await client.query("DROP TABLE IF EXISTS Meeting;");
await client.query("DROP TABLE IF EXISTS Room;");
await client.query("DROP TABLE IF EXISTS Invitee;");

// Create tables
await client.query(`
CREATE TABLE Inviter (
    inviter_id SERIAL PRIMARY KEY,
    inviter_name VARCHAR(50)
);
CREATE TABLE Invitee (
    invitee_no SERIAL PRIMARY KEY,
    invitee_name VARCHAR(50),
    inviter_id INT,
    FOREIGN KEY (inviter_id) REFERENCES Inviter(inviter_id)
);
`);

await client.query(`
CREATE TABLE Room (
    room_no SERIAL PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
);
`);

await client.query(`
CREATE TABLE Meeting (
    meeting_no SERIAL PRIMARY KEY,
    meeting_title VARCHAR(100),
    starting_time TIMESTAMP,
    ending_time TIMESTAMP,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);
`);

console.log("Tables created");

// Insert Invitee rows
await client.query(`
INSERT INTO Inviter (inviter_name) VALUES
('APS-Group'),
('Sky-Data'),
('ASML-Team'),
('DAF-Unit'),
('PHILIPS-Division');

INSERT INTO Invitee (invitee_name, invited_by) VALUES
('Ahmad', 1),
('Fatima', 2),
('John', 3),
('David', 4),
('Maria', 5);
`);

// Insert Room rows
await client.query(`
INSERT INTO Room (room_name, floor_number) VALUES
('Work', 2),
('Internship', 2),
('Stage', 2),
('Comfort', 1),
('Expert', 3);
`);

// Insert Meeting rows
await client.query(`
INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
('Tech Talk', '2025-01-10 10:00', '2025-01-10 12:00', 2),
('Project Update', '2025-01-11 14:00', '2025-01-11 15:00', 2),
('Pause', '2025-01-12 09:00', '2025-01-12 11:00', 1),
('Team Alignment', '2025-01-13 13:00', '2025-01-13 14:30', 4),
('Weekly Review', '2025-01-14 16:00', '2025-01-14 17:00', 3);
`);

console.log("Rows inserted");

await client.end();
}

// Main function
async function main() {
try {
await createDatabase();
await setupTables();
console.log("Great! ALL DONE, Database ready to use.");
} catch (error) {
console.error("ERROR:", error);
}
}

main();
