# Insurance Charges Prediction

A Machine Learning project that predicts medical insurance charges based on personal and lifestyle-related features such as age, sex, BMI, number of children, smoking status, and region.

The project uses multiple regression algorithms and a Flask backend to serve predictions through a web application.

## Features

- Predicts estimated medical insurance charges.
- Performs data cleaning and exploratory data analysis (EDA).
- Applies feature scaling to numerical features.
- Encodes categorical variables.
- Trains and compares multiple regression models.
- Uses Gradient Boosting Regressor for prediction.
- Provides a Flask REST API for model inference.
- Integrates with an HTML, CSS, and JavaScript frontend.

## Tech Stack

**Machine Learning**

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Seaborn

**Backend**

- Flask
- Flask-CORS
- Joblib

**Frontend**

- HTML
- CSS
- JavaScript

## Project Structure

```text
insurance-prediction/
├── backend/
│   ├── app.py
│   ├── insurance_model.pkl
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── notebooks/
│   └── insurance_prediction.ipynb
└── README.md
```

*Note: Adjust the folder structure to match your actual project.*

## Machine Learning Models

The project compares the following regression algorithms:

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor

### Model Evaluation

The Gradient Boosting Regressor achieved the following results in the current experiment:

| Metric                         |    Score |
| ------------------------------ | -------: |
| Mean Absolute Error (MAE)      | 2,528.95 |
| Root Mean Squared Error (RMSE) | 4,308.04 |
| R² Score                       |   0.8990 |

These results are specific to the current train-test split and preprocessing setup. They may vary with different data splits or configurations.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd insurance-prediction
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Create a virtual environment (optional)

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
python -m pip install -r backend/requirements.txt
```

### 4. Start the Flask backend

```bash
cd backend
python app.py
```

The API should run at:

```text
http://127.0.0.1:5000
```

### 5. Open the frontend

Open `frontend/index.html` in your browser or use the VS Code Live Server extension.

Make sure the JavaScript frontend sends prediction requests to:

```text
http://127.0.0.1:5000/predict
```

## API Endpoint

### Predict Insurance Charges

**Endpoint:** `/predict`

**Method:** `POST`

**Content-Type:** `application/json`

Example request:

```json
{
  "age": 25,
  "sex": "male",
  "bmi": 27.5,
  "children": 0,
  "smoker": "no",
  "region": "northwest"
}
```

Example response:

```json
{
  "prediction": 12345.67
}
```

The response value above is illustrative, not an actual prediction.

## Input Features

| Feature  | Description                  |
| -------- | ---------------------------- |
| Age      | Age of the individual        |
| Sex      | Male or female               |
| BMI      | Body Mass Index              |
| Children | Number of dependent children |
| Smoker   | Smoking status               |
| Region   | Residential region           |

The backend must apply the same feature encoding, BMI category rules, feature ordering, and fitted scaler used during model training.

## Evaluation Metrics

- **MAE:** Average absolute difference between actual and predicted charges.
- **RMSE:** Penalizes larger prediction errors more heavily.
- **R² Score:** Measures how much of the target variance is explained by the model on the evaluated dataset.

## Future Improvements

- Improve model performance through hyperparameter tuning.
- Add cross-validation and more detailed model evaluation.
- Build a more responsive frontend.
- Add automated tests for the prediction API.
- Deploy the application online.
- Add input validation and improved error handling.

## Disclaimer

This project is intended for educational and demonstration purposes only. Predictions are estimates and should not be treated as actual insurance quotes or financial advice.

## Author

**Ritik Singh**

B.Tech Computer Science Engineering Student

GitHub: [Ritik-Singh7](https://github.com/Ritik-Singh7)
