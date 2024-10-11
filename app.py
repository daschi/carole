"""API endpoints for frontend requests"""

from flask import Flask, request, jsonify
from interpreter import CaroleInterpreter

app = Flask(__name__)


@app.route("/interpret", methods=["POST"])
def interpret_tarot():
    """Endpoint for collecting tarot reading inputs"""
    carole = CaroleInterpreter()
    spread = request.form["spread"]  # str
    cards = request.form.getlist("cards[]")  # [(card_name, card_direction)]
    question = request.form["question"]  # str

    interpretation = carole.generate_interpretation(
        cards=[(card.split(",")[0], card.split(",")[1]) for card in cards],
        user_question=question,
        tarot_spread=spread,
    )
    return interpretation


if __name__ == "__main__":
    app.run(debug=True)
