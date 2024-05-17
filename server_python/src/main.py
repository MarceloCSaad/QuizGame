from abc import abstractclassmethod
import random 

import flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

import requests as r
import json

import htmlentities

PORT = 8000

app = flask.Flask(__name__)
cors = CORS(app)
app.config["DEBUGG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

correct_answer: str

#-------------------------------------------------------------
# Funções soltas:
# - Colocar depois em lib folder
#-------------------------------------------------------------

def frontend_formatting(obj):
    category = obj["category"]
    boolean = True if obj["type"] == "boolean" else False
    question = htmlentities.decode(obj["question"])
    answers = []

    for element in obj["incorrect_answers"]:
        answers.append(htmlentities.decode(element))
    
    answers.append(obj["correct_answer"])
    random.shuffle(answers)
    
    return {
        "category": category, 
        "boolean": boolean, 
        "question": question, 
        "answers": answers
    }


#-------------------------------------------------------------
# Funções de rotas:
# - Colocar depois em routes folder
#-------------------------------------------------------------

@app.route("/getNewRound", methods=["GET"])
#@cross_origin()
def get_new_round():
    
    global correct_answer
    
    print("Gotta \"/getNewRound\" request...")
    difficulty = request.args["difficulty"]    
    url = f"https://opentdb.com/api.php?amount=1&difficulty={difficulty.lower()}"

    try:     
        res = r.get(url)
        print(json.dumps(res.json()["results"][0], sort_keys=True, indent=4))
        correct_answer = res.json()["results"][0]["correct_answer"]
        return frontend_formatting(res.json()["results"][0])

    except Exception as err: 
        print(f"Deu ruim...")
        return jsonify(message="error...")


@app.route("/validate", methods=["GET"])
#@cross_origin()
def validate():
    print(f"Frontend needs to /validate {request.args['answer']}")
    validate_response = True if request.args["answer"] == correct_answer else False
    return json.dumps(validate_response)

if __name__ == "__main__":
    print("API Rodando")
    app.run(host="0.0.0.0", port=PORT)

