"""This module is for scraping wikipedia tarot images"""

import json
import scrapy

from biddy.biddy.constants import MAJOR_ARCANA


BASE_URL = "https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_Tarot#/media"


class TarotWikiSpider(scrapy.Spider):
    """Scraper for wikipedia RWS tarot images."""

    name = "tarot_wiki"

    def build_major_arcana_urls(self):
        """Build URLs for major arcana images"""
        urls = []
        for index, major_arcana_card in enumerate(MAJOR_ARCANA):
            index = index if index >= 10 else f"0{index}"
            urls.append(
                f"{BASE_URL}/File:RWS_Tarot_{index}_{major_arcana_card.title()}.jpg"
            )
        return urls

    def build_minor_arcana_urls(self):
        """Build URLs for minor arcana images"""
        urls = []
        minor_arcana = ["Wands", "Swords", "Pents", "Cups"]
        for arcana in minor_arcana:
            for number in range(1, 15):
                # For some reason 9 is different the the rest of the cards
                if number == 9 and arcana == "Wands":
                    urls.append(f"{BASE_URL}/File:Tarot_Nine_of_Wands.jpg")
                card_number = number if number >= 10 else f"0{number}"
                urls.append(f"{BASE_URL}/File:{arcana}{card_number}.jpg")
        return urls

    # pylint: disable=arguments-differ
    def parse(self, response):
        return response

    def closed(self):
        """Write the accumulated results to a JSON file once spider is done"""
        with open("random.json", "w", encoding="utf-8") as f:
            json.dump({}, f, ensure_ascii=False)
