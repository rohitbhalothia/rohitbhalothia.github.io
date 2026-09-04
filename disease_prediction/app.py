from flask import Flask, render_template, request
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("diabetes_model.pkl")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():

    values = [
        float(request.form['pregnancies']),
        float(request.form['glucose']),
        float(request.form['bloodpressure']),
        float(request.form['skinthickness']),
        float(request.form['insulin']),
        float(request.form['bmi']),
        float(request.form['dpf']),
        float(request.form['age'])
    ]

    prediction = model.predict([values])

    if prediction[0] == 1:
        result = "High Risk of Diabetes"
    else:
        result = "Low Risk of Diabetes"

    return render_template('index.html', prediction_text=result)

if __name__ == '__main__':
    app.run(debug=True)