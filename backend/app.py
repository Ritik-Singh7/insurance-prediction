from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

bundle = joblib.load("insurance_model.pkl")

model = bundle["model"]
scaler = bundle["scaler"]
feature_columns = bundle["feature_columns"]


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Insurance Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        age = float(data["age"])
        sex = str(data["sex"]).lower()
        bmi = float(data["bmi"])
        children = int(data["children"])
        smoker = str(data["smoker"]).lower()
        region = str(data["region"]).lower()

        if not 18 <= age <= 100:
            return jsonify({"error": "Age must be between 18 and 100"}), 400

        if not 10 <= bmi <= 80:
            return jsonify({"error": "Please enter a valid BMI"}), 400

        if children < 0:
            return jsonify({"error": "Children cannot be negative"}), 400

        if sex not in ["male", "female"]:
            return jsonify({"error": "Invalid sex value"}), 400

        if smoker not in ["yes", "no"]:
            return jsonify({"error": "Invalid smoker value"}), 400

        if region not in [
            "northeast", "northwest", "southeast", "southwest"
        ]:
            return jsonify({"error": "Invalid region value"}), 400

        numerical_data = pd.DataFrame(
            [[age, bmi, children]],
            columns=["age", "bmi", "children"]
        )

        scaled_values = scaler.transform(numerical_data)[0]

        input_data = {column: 0 for column in feature_columns}

        input_data["age"] = scaled_values[0]
        input_data["bmi"] = scaled_values[1]
        input_data["children"] = scaled_values[2]

        input_data["sex"] = 1 if sex == "male" else 0
        input_data["smoker"] = 1 if smoker == "yes" else 0

        if region != "northeast":
            input_data[f"region_{region}"] = 1

        input_df = pd.DataFrame(
            [input_data],
            columns=feature_columns
        )

        prediction = model.predict(input_df)[0]

        return jsonify({
            "prediction": round(float(prediction), 2)
        })

    except (KeyError, TypeError, ValueError) as error:
        return jsonify({"error": f"Invalid input: {error}"}), 400

    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({"error": "Prediction failed. Check backend logs."}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)