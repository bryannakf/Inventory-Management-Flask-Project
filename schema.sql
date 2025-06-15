-- Run this using a SQLite browser or via Python script
CREATE TABLE datacenter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    datacenter_id INTEGER NOT NULL,
    FOREIGN KEY(datacenter_id) REFERENCES datacenter(id)
);
