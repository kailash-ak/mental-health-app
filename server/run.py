from waitress import serve
from app import create_app  # Update your app.py to use factory pattern

app = create_app()

if __name__ == '__main__':
    serve(app, host='127.0.0.1', port=5000)  # Serve the app using Waitress