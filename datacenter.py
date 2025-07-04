from db import get_db

# Create
def add_datacenter(location, capacity):
    db = get_db()
    db.execute(
        'INSERT INTO datacenter (location, capacity) VALUES (?, ?)',
        (location, capacity)
    )
    db.commit()

# Read
def get_datacenters():
    db = get_db()
    return db.execute('SELECT * FROM datacenter').fetchall()

# Update
def update_datacenter(datacenter_id, capacity):
    db = get_db()
    db.execute(
        'UPDATE datacenter SET capacity = ? WHERE id = ?',
        (capacity, datacenter_id)
    )
    db.commit()

# Delete
def delete_datacenter(datacenter_id):
    db = get_db()
    db.execute('DELETE FROM datacenter WHERE id = ?', (datacenter_id,))
    db.commit()
