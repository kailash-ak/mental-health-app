import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('ModelTraining')

try:
    # Load the dataset
    data_path = r'C:\mental-health-app\server\model\Mental disorder symptoms.csv'

    data = pd.read_csv(data_path)
    logger.info("Dataset loaded successfully.")

    # Encode the labels (disorder column)
    le = LabelEncoder()
    data['Disorder'] = le.fit_transform(data['Disorder'])

    # Calculate correlation of all features with the target
    target_correlation = data.corr()['Disorder'].abs().sort_values(ascending=False)

    # Keep features with significant correlation (e.g., |correlation| > 0.1)
    significant_features = target_correlation[target_correlation > 0.1].index.tolist()
    features = [
        "close.friend","repetitive.behaviour","introvert","hallucinations",
        "breathing.rapidly","popping.up.stressful.memory","anger","feeling.negative",
        "increased.energy","weight.gain",
        "having.trouble.with.work","feeling.tired","suicidal.thought"
    ]

    # Split the dataset into features and target
    X = data[features]
    y = data['Disorder']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize the model
    model = GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=3,
        random_state=42
    )

    # Train the model
    model.fit(X_train, y_train)
    logger.info("Model training complete.")

    # Save the trained model and label encoder
    model_path = os.path.join('C:\\', 'mental-health-app', 'server', 'model', 'model.pkl')
    le_path = os.path.join('C:\\', 'mental-health-app', 'server', 'model', 'label_encoder.pkl')
    joblib.dump(model, model_path)
    joblib.dump(le, le_path)
    logger.info("Model and label encoder saved successfully.")

except Exception as e:
    logger.error(f"An error occurred: {str(e)}")
