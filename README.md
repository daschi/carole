## Local Setup

### Python Setup

This is assuming you are using pipenv to manage your virtual environment (`pip install --user pipenv`).

```sh
:> pipenv shell # Activate your project's pipenv
:> pipenv install # Install python packages
```

Start the Flask API server

```sh
:> python3 project/path/carole/app.py
```

### Frontend Setup

Make sure you have `node` and `npm` installed.

```sh
:> npm install
:> npm run dev
```

### Running the scraper

This shouldn't be necessary yet since the data is just saved as a json file, but adding it here for documentation and if we want to add more spiders in the future.

```sh
# from the carole/biddy/biddy directory
:> scrapy crawl biddyspider
```

### Carole the Tarot RAG

This project was started so that I could learn more about using the OpenAI API to generate responses, and to interpret my occasional tarot readings with Carole.

The app will:

- Accept user input (tarot cards drawn, their order, spread used, and question asked).
- Retrieve relevant information about the tarot cards from specific websites like Biddy Tarot.
- Use OpenAI’s API to generate an interpretation based on the retrieved information.

### Tools

- Python: For backend processing, handling the logic, and API interactions.
- JavaScript: For building the frontend and providing user interaction.
- OpenAI API: To generate meaningful interpretations using GPT models.
- Web Scraping: To fetch information from tarot websites (e.g., Biddy Tarot).
