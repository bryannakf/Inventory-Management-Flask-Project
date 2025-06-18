from db import get_db

#defining CRUD ops
def add_datacenter(location, capacity):
    db= get_db()
    db.execute('INSERT INTO datacenter (location, capacity) VALUES (?,?)', (location, capacity))
    db.commit()
    
def get_datacenters():
    db = get_db()
    return db.execute('SELECT* FROM datacenter').fetchall()

def update_datacenter(datacenter_id, capacity):
    db = get_db()
    db.execute('UPDATE datacenter SET capacity = ? WHERE id =?', (datacenter_id, capacity))
    db.commit()
    
def delete_datacenter(datacenter_id):
    db = get_db()
    db.execute('DELETE FROM datacenter WHERE id = ?', (datacenter_id,))
    db.commit()