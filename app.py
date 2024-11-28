import pickle
import numpy as np
from flask import Flask, render_template, request
from apifairy import APIFairy

app = Flask(__name__)
app.config['APIFAIRY_TITLE'] = 'AquaSeal'
app.config['APIFAIRY_VERSION'] = '1.0'

api_fairy = APIFairy(app)

with open('./models/aquaseal_regresion_model.pkl', 'rb') as f:
    regresion_model = pickle.load(f)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = [float(x) for x in request.form.values()]
        input_data = np.array(data).reshape(1, -1)
        regresion_prediction = regresion_model.predict(input_data)[0]
        regresion_prediction = round(regresion_prediction, 2)
        #enum for classification between 80-100 is excelent, 52-80 is good, 32-52 is regular, 20-32 is bad, 0-20 is very bad
        if regresion_prediction >= 80:
            classification = 'Excelent'
        elif regresion_prediction >= 52:
            classification = 'Good'
        elif regresion_prediction >= 32:
            classification = 'Regular'
        elif regresion_prediction >= 20:
            classification = 'Bad'
        else:
            classification = 'Very Bad'

        return render_template('index.html',
                               regresion_prediction=regresion_prediction,
                               classification=classification)
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run()
