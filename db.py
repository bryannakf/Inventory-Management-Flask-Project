import sqlite3
from flask import g
DATABASE = 'database.db'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect('data.db')
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
        


# import sqlite3
# from flask import g

# DATABASE = 'instance/app.sqlite'

# def get_db():
#     db = getattr(g, '_database', None)
#     if db is None:
#         db = g._database = sqlite3.connect(DATABASE)
#         db.row_factory = sqlite3.Row
#     return db

# def close_db(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()
        
def init_app(app):
    app.teardown_appcontext(close_db)