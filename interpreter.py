"""
Carole interpreter module
"""

import json
import os
from openai import OpenAI

client = OpenAI()


class CaroleInterpreter:
    """Load and supplement Carole interpretations"""

    def load_biddy_data(self):
        """Load the BiddyTarot data from JSON"""
        print("wd", os.getcwd())
        with open("biddytarot.json", "r", encoding="utf-8") as file:
            return json.load(file)

    def retrieve_card_descriptions(self, cards_info):
        """Retrieve descriptions for all cards pulled"""
        biddy = self.load_biddy_data()
        descriptions = []
        for card, card_direction in cards_info:
            descriptions.append(
                f"""
          Card: {card}
          Keywords: {biddy[card]["keywords"][card_direction]}
          Description: {biddy[card]["description"]}
          Interpretation: {biddy[card][card_direction]}
        """
            )
        return "".join(descriptions)

    def create_prompt(self, cards_info, spread_info):
        """Create the system prompt"""
        return f"""
          You are a tarot card interpreter and expert. The user will provide you with a general question they're seeking clarity on, 
          the tarot spread they need interpreted, and the cards selected for that tarot spread in the order they were selected. 
          Based on the cards, the question and the spread, generate an tarot card reading for the user. When interpreting the tarot spread,
          take into account the card's description, whether it is Upright or Reversed, and the meaning associated with the card. The 
          meaning can change depending on if the card is reversed or upright and the position in the spread. 


          The user has supplied the following information about the tarot spread:
          Type of tarot spread: {spread_info}
          Cards pulled in order: {cards_info}

          Use the additional data supplied by BiddyTarot.com that was scraped and saved as a json file. The data is provided here in json format for you to use in the interpretation:
          {self.retrieve_card_descriptions(cards_info)}

          When you supply the answer, start first by listing each card's keywords at the beginning. 
        """

    def generate_interpretation(self, cards_info, user_question, spread_info):
        """Generate the interpretation for the tarot cards pulled."""
        system_message = self.create_prompt(cards_info, spread_info)
        print("MESSAGE", system_message)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": f"{user_question}"},
            ],
        )
        return response.choices[0].message


interpreter = CaroleInterpreter()

print(
    interpreter.generate_interpretation(
        cards_info=[
            ("lovers", "upright"),
            ("world", "reversed"),
            ("three-of-cups", "upright"),
        ],
        user_question="What should I consider before I head into this weekend?",
        spread_info="Past, Present, Future",
    )
)
