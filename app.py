from flask import Flask, current_app, render_template, request, jsonify
from db import get_db, close_db, init_app
from inventory import add_item, get_items, update_item, delete_item
from datacenter import add_datacenter, get_datacenters, update_datacenter, delete_datacenter

app = Flask(__name__)
app.config.from_mapping(
    DATABASE="datacenter.db",
)

init_app(app)

def init_db():
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')
    
@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/api/item', methods=['POST'])
def api_add_item():
    data = request.get_json()
    item_name = data.get('item_name')
    quantity = data.get('quantity')
    datacenter_id = data.get('datacenter_id')
    if not item_name or not quantity or not datacenter_id:
        return jsonify({'error': 'Item name, Quantity, and Datacenter ID are required'}), 400
    add_item(item_name, quantity, datacenter_id)
    return jsonify({'message': 'Item added successfully'}), 201

@app.route('/api/items', methods=['GET'])
def api_get_items():
    items = get_items()
    return jsonify([
        {'id': item['id'], 'item_name': item['item_name'], 'quantity': item['quantity'], 'datacenter_id': item['datacenter_id']}
        for item in items
    ])
@app.route("/api/item/<int:id>", methods=["PUT"])
def api_update_item(id):
    data = request.get_json()

    quantity = data.get("quantity")
    datacenter_id = data.get("datacenter_id")

    if quantity is None or datacenter_id is None:
        return jsonify({"error": "Quantity and Datacenter ID required"}), 400

    updated = update_item(id, quantity, datacenter_id)
    if updated == 0:
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"message": "Item updated"}), 200

# @app.route("/api/item/<int:id>", methods=["PUT"])
# def api_update_item(id):
#     data = request.get_json()

#     quantity = data.get("quantity")
#     datacenter_id = data.get("datacenter_id")

#     # Validate inputs (handle zeroes correctly)
#     if quantity is None or datacenter_id is None:
#         return jsonify({"error": "Quantity and Datacenter ID required"}), 400

#     # Check if item exists
#     items = get_items()
#     item_exists = any(item["id"] == id for item in items)
#     if not item_exists:
#         return jsonify({"error": "Item not found"}), 404

#     # If all good, update item
#     update_item(id, quantity, datacenter_id)
#     return jsonify({"message": "Item updated"}), 200

@app.route("/api/item/<int:id>", methods=["DELETE"])
def api_delete_item(id):
    items = get_items()
    item_exists = any(item["id"] == id for item in items)
    if not item_exists:
        return jsonify({"error": "Item not found"}), 404

    delete_item(id)
    return jsonify({"message": "Item deleted"}), 200


# @app.route("/api/item/<int:id>", methods=["PUT"])
# def api_update_item(id):
#     data = request.get_json()
    
#     quantity = data.get("quantity")
#     datacenter_id = data.get("datacenter_id")    
#     if not quantity or not datacenter_id:
#         return jsonify({"error": "Quantity and Datacenter ID required"}), 400
#     update_item(id, quantity, datacenter_id)
#     return jsonify({"message": "Item updated"}), 200

# @app.route("/api/item/<int:id>", methods=["DELETE"])
# def api_delete_item(id):
#     delete_item(id)
#     return jsonify({"message": "Item deleted"}), 200



@app.route('/datacenter')
def datacenter():
    return render_template ('datacenter.html')

@app.route('/api/datacenter', methods=['POST'])
def api_add_datacenter():
    data = request.get_json()
    location = data.get('location')
    capacity = data.get('capacity')
    if not location or not capacity:
        return jsonify({'error': 'Location and Capacity are required'}), 400
    add_datacenter(location, capacity)
    return jsonify({'message': 'Datacenter added successfully'}), 201

@app.route('/api/datacenters', methods=['GET'])
def api_get_datacenters():
    datacenters = get_datacenters()
    return jsonify([
        {'id': dc['id'], 'location': dc['location'], 'capacity': dc['capacity']}
        for dc in datacenters
    ])

@app.route("/api/datacenter/<int:id>", methods=["PUT"])
def api_update_datacenter(id):
    data = request.get_json()
    capacity = data.get("capacity")

    if capacity is None:
        return jsonify({"error": "Capacity required"}), 400

    datacenters = get_datacenters()
    datacenter_exists = any(dc["id"] == id for dc in datacenters)
    if not datacenter_exists:
        return jsonify({"error": "Datacenter not found"}), 404

    update_datacenter(id, capacity)
    return jsonify({"message": "Datacenter updated"}), 200

@app.route("/api/datacenter/<int:id>", methods=["DELETE"])
def api_delete_datacenter(id):
    datacenters = get_datacenters()
    datacenter_exists = any(dc["id"] == id for dc in datacenters)
    if not datacenter_exists:
        return jsonify({"error": "Datacenter not found"}), 404

    delete_datacenter(id)
    return jsonify({"message": "Datacenter deleted"}), 200
