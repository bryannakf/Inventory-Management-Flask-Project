import sqlite3
from flask import g

DATABASE = 'instance/app.sqlite'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
        
def init_app(app):
    app.teardown_appcontext(close_db)