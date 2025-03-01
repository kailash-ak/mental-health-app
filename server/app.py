from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # Import JWTManager
from auth import auth_bp
from model_loader import predict
import logging
from werkzeug.middleware.proxy_fix import ProxyFix
import os

def create_app():
    app = Flask(__name__)
    jwt = JWTManager(app)  # Initialize JWTManager
    
    # Security configuration
    app.config.update(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY', 'dev-key-123'),  # Added default dev key
        JSON_SORT_KEYS=False,
        JWT_SECRET_KEY=os.getenv('FLASK_SECRET_KEY', 'dev-key-123'),  # JWT secret key
        JWT_TOKEN_LOCATION=['cookies'],
        JWT_ACCESS_COOKIE_PATH='/api/',
        JWT_COOKIE_CSRF_PROTECT=False  # Disable CSRF protection for development
    )

    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

    # Enhanced CORS configuration
    CORS(app, 
        resources={
            r"/*": {"origins": os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000')}
        },
        supports_credentials=True,
        expose_headers=["Content-Type", "Authorization"],
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Configure logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('MentalHealthAPI')

    # Health check endpoint
    @app.route("/", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "version": "1.0.0",
            "services": ["authentication", "prediction"]
        })

    # Prediction endpoint
    @app.route('/api/predict', methods=['POST'])
    def predict_disorder():
        try:
            app.logger.info(f"Incoming payload: {request.get_json()}")  # Log incoming payload for debugging
            if not request.is_json:
                return jsonify({"error": "Request must be JSON"}), 415
            data = request.get_json()
            if not data or 'answers' not in data:
                return jsonify({"error": "Missing 'answers' in request body"}), 400
                
            prediction, confidence = predict(data['answers'])
            app.logger.info(f"Prediction: {prediction}, Confidence: {confidence}")  # Log prediction results
            
            if prediction is None:
                return jsonify({"error": "Prediction failed"}), 500
                
            return jsonify({
                'diagnosis': prediction,
                'confidence': confidence,
                #'recommendations': get_recommendations(prediction)
            })
            
        except Exception as e:
            app.logger.error(f"Prediction error: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500

    def get_recommendations(disorder):
        recommendations = {
            'depression': [
                "Cognitive Behavioral Therapy (CBT)",
                "Regular physical exercise",
                "Maintain a consistent sleep schedule"
            ],
            'anxiety': [
                "Mindfulness meditation",
                "Deep breathing exercises",
                "Limit caffeine intake"
            ]
        }
        return recommendations.get(disorder.lower(), ["Consult a licensed mental health professional"])

    return app
