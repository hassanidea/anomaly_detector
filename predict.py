from flask import Flask, request, jsonify
import pickle
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Load the trained model from a .pkl file
with open("dt_model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(data)
        # Extract input values
        vix = float(data['vix'])
        it2y = float(data['it2y'])
        date = data['date']
        print(vix, it2y, date)

        # Convert date to numerical value if needed
        date_value = datetime.strptime(date, "%Y-%m-%d").timestamp()

        # Prepare the feature vector
        features = np.array([[vix, it2y]])

        # Make prediction
        is_anomaly = model.predict(features)[0]  # Assuming binary output: 1 = anomaly, 0 = normal

        # Return the result
        return jsonify({"is_anomaly": bool(is_anomaly)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
