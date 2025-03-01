import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    JWTManager
)
from datetime import timedelta
import os

auth_bp = Blueprint('auth', __name__)

def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@auth_bp.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response

@auth_bp.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    data = request.get_json()
    if not data or not all(key in data for key in ['email', 'password', 'name']):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_pw = generate_password_hash(data['password'])
    conn = get_db()
    try:
        conn.execute('INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
                    (data['email'], data['name'], hashed_pw))
        conn.commit()
        return jsonify({'message': 'User created'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400
    finally:
        conn.close()

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    data = request.get_json()
    if not data or not all(key in data for key in ['email', 'password']):
        return jsonify({'error': 'Missing email or password'}), 400

    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (data['email'],)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], data['password']):
        access_token = create_access_token(
            identity=user['email'],
            expires_delta=timedelta(hours=1)
        )
        response = jsonify({
            'message': 'Login successful',
            'user': {
                'email': user['email'],
                'name': user['name']
            }
        })
        response.set_cookie(
            'access_token_cookie',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            path='/'
        )
        return response, 200
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({'error': 'Missing email or new password'}), 400

    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    hashed_password = generate_password_hash(new_password)
    conn.execute('UPDATE users SET password = ? WHERE email = ?', (hashed_password, email))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Password successfully updated'}), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        email = get_jwt_identity()
        conn = get_db()
        user = conn.execute('SELECT email, name FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        if user:
            return jsonify({'user': dict(user)}), 200
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logged out'})
    response.delete_cookie('access_token_cookie', path='/')
    return response, 200

def create_users_table():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_users_table()
