from db import get_db

#defining CRUD ops
def add_item(item_name, quantity):
    db= get_db()
    db.execute('INSERT INTO inventory (item_name, quantity) VALUES (?,?)', (item_name, quantity))
    db.commit()
    
def get_items():
    db = get_db()
    return db.execute('SELECT* FROM inventory').fetchall()

def update_item(item_id, quantity):
    db = get_db()
    db.execute('UPDATE inventory SET quantity = ?, WHERE id =?', (quantity, item_id))
    db.commit()
    
def delete_item(item_id):
    db = get_db()
    db.execute('DELETE FROM inventory WHERE id = ?', (item_id,))
    db.commit()