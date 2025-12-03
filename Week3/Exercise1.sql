-- 3NF Normalized Schema


CREATE TABLE members (
    member_id INT PRIMARY KEY,
    member_name VARCHAR(100) NOT NULL,
    member_address VARCHAR(200) NOT NULL
);

CREATE TABLE venues (
    venue_code VARCHAR(10) PRIMARY KEY,
    venue_description VARCHAR(200) NOT NULL
);


CREATE TABLE dinners (
    dinner_id VARCHAR(20) PRIMARY KEY,
    dinner_date DATE NOT NULL,
    venue_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (venue_code) REFERENCES venues(venue_code)
);


CREATE TABLE food (
    food_code VARCHAR(10) PRIMARY KEY,
    food_description VARCHAR(100) NOT NULL
);


CREATE TABLE dinner_food (
    dinner_id VARCHAR(20),
    food_code VARCHAR(10),
    PRIMARY KEY (dinner_id, food_code),
    FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id),
    FOREIGN KEY (food_code) REFERENCES food(food_code)
);


CREATE TABLE member_dinner (
    member_id INT,
    dinner_id VARCHAR(20),
    PRIMARY KEY (member_id, dinner_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (dinner_id) REFERENCES dinners(dinner_id)
);
