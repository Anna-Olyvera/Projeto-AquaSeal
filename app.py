import pickle
import numpy as np
from flask import Flask, render_template, request
from apifairy import APIFairy


api_fairy = APIFairy()


def create_app(test=False, mock_model=None):
    app = Flask(__name__)
    app.config['APIFAIRY_TITLE'] = 'AquaSeal'
    app.config['APIFAIRY_VERSION'] = '1.0'
    api_fairy.init_app(app)

    if not test:
        with open('./models/aquaseal_regresion_model.pkl', 'rb') as f:
            app.regresion_model = pickle.load(f)
    else:
        app.regresion_model = mock_model

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/predict', methods=['POST'])
    def predict():
        try:
            data = [float(x) for x in request.form.values()]
            if data is [] or len(data) != 11:
                return "<h1>Error</h1>"

            input_data = np.array(data).reshape(1, -1)
            if test:
                regresion_prediction = app.regresion_model
            else:
                regresion_prediction = app.regresion_model.predict(input_data)[0]
                regresion_prediction = round(regresion_prediction, 2)

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
            return "<h1>Error</h1>"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()