import random
import json
import torch
from model import NeuralNet
from utils import bag_of_words, tokenize
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as f:
    intents = json.load(f)

FILE = 'data.pth'
data = torch.load(FILE)
input_size = data['input_size']
hidden_size = data['hidden_size']
output_size = data['output_size']
all_words = data['all_words']
tags = data['tags']
model_state = data['model_state']
model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

CORS(app, origins=["http://localhost:3001"])

bot_name = "James"
@app.route("/", methods=['POST'])
def talk():
    req = request.get_json()
    print(req)
    sentence = req.get('sentence')

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent['tag']:
                return jsonify({"message":f"{bot_name}: {random.choice(intent['responses'])}"}), 200
    else:
        return jsonify({"message": f"{bot_name}: I do not understand..."}), 200