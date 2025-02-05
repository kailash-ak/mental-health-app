import joblib
import logging  # Import logging

# Load the trained model and label encoder
model = joblib.load('model/model.pkl')
label_encoder = joblib.load('model/label_encoder.pkl')

# Function to make predictions
def predict(answers_dict):
    try:
        expected_features=[

            'close.friend', 'repetitive.behaviour', 'introvert', 
            'hallucinations', 'breathing.rapidly', 'anger',
            'popping.up.stressful.memory', 'feeling.negative', 
            'having.nightmares', 'increased.energy', 'sweating',
            'weight.gain', 'having.trouble.with.work', 'feeling.tired',
            'suicidal.thought'
        ]
        
        # Log the incoming answers_dict
        logging.info(f"Received answers: {answers_dict}")  # Log the incoming answers


        answers_list = [answers_dict[feature] for feature in expected_features]
        
        # Process the answers (assuming it's a list of numerical values for features)
        prediction = model.predict([answers_list])  # Make prediction

        
        # Log the prediction results
        logging.info(f"Prediction: {prediction}")  # Log the prediction result


        # Convert the numeric prediction to the corresponding label (disorder name)
        prediction_label = label_encoder.inverse_transform(prediction)
        
        # Confidence score of the prediction
        confidence = float(model.predict_proba([answers_list]).max())
        
        return prediction_label[0], confidence
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")  # Log the error
        return None, None  # Return None for both values in case of error
