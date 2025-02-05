import sqlite3

# Create a connection to the SQLite database (it will create the database if it doesn't exist)
conn = sqlite3.connect('database.db')

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Create the 'users' table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')

# Commit the transaction and close the connection
conn.commit()
conn.close()

print("Database setup complete.")
