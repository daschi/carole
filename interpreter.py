"""
Carole interpreter module
"""

from openai import OpenAI

client = OpenAI()


def generate_interpretation(cards_info, user_question, spread_info):
    """Generate the interpretation for the tarot cards pulled."""
    system_message = f"""
      You are a tarot card interpreter and expert. The user will provide you with a general question they're seeking clarity on, 
      the tarot spread they need interpreted, and the cards selected for that tarot spread in the order they were selected. 
      Based on the cards, the question and the spread, generate an tarot card reading for the user. When interpreting the tarot spread,
      take into account the card's description, whether it is Upright or Reversed, and the meaning associated with the card. The 
      meaning can change depending on if the card is reversed or upright and the position in the spread. 


      The user has supplied the following information about the tarot spread:
      Type of tarot spread: {spread_info}
      Cards pulled in order: {cards_info}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"{user_question}"},
        ],
    )
    return response.choices[0].message


print(
    generate_interpretation(
        cards_info="1. The Lovers, 2. The World, 3. Hierophant",
        user_question="What should I consider before I head into this weekend?",
        spread_info="Past, Present, Future",
    )
)
