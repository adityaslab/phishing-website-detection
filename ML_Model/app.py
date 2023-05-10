from flask import Flask, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import numpy as np
import pickle as p
import json


app = Flask(__name__)
CORS(app)

print('before main')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


@app.route('/api/', methods=['POST'])
def makecalc():
    modelfile = 'models/final_prediction.pickle'
    model = p.load(open(modelfile, 'rb'))
    data = request.get_json()
    print(data)
    arr = np.array(list(data.values()))
    prediction = np.array2string(model.predict([arr]))
    return jsonify(prediction)
