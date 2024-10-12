"""API endpoints for frontend requests"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from interpreter import CaroleInterpreter

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


@app.route("/interpret", methods=["POST"])
def interpret_tarot():
    """Endpoint for collecting tarot reading inputs"""
    # carole = CaroleInterpreter()
    # data = request.json
    # interpretation = carole.generate_interpretation(
    #     cards=data["cards"],
    #     user_question=data["question"],
    #     tarot_spread=data["spread"],
    # )
    # return jsonify(interpretation)

    # for local development:
    try:
        # Read the content of the markdown file
        with open("./data/example_response.md", "r", encoding="utf-8") as markdown_file:
            content = markdown_file.read()

            # Return the content as a response
            return content

    except FileNotFoundError:
        return jsonify({"error": "Markdown file not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
