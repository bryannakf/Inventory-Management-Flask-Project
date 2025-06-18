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
    if not capacity:
        return jsonify({"error": "Capacity required"}), 400
    update_datacenter(id, capacity)
    return jsonify({"message": "Datacenter updated"}), 200

@app.route("/api/datacenter/<int:id>", methods=["DELETE"])
def api_delete_datacenter(id):
    delete_datacenter(id)
    return jsonify({"message": "Datacenter deleted"}), 200




