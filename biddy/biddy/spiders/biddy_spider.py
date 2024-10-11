"""This module is for scraping biddytarot.com"""

import json
from typing import Dict, Iterable, List
import scrapy
from pathlib import Path


MAJOR_ARCANA = [
    "fool",
    "magician",
    "high-priestess",
    "empress",
    "emperor",
    "hierophant",
    "lovers",
    "chariot",
    "strength",
    "hermit",
    "wheel-of-fortune",
    "justice",
    "hanged-man",
    "death",
    "temperance",
    "devil",
    "tower",
    "star",
    "moon",
    "sun",
    "judgement",
    "world",
]

MINOR_ARCANA = ["suit-of-cups", "suit-of-wands", "suit-of-swords", "suit-of-pentacles"]

MINOR_CARDS = [
    "ace",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "page",
    "knight",
    "queen",
    "king",
]

BASE_URL = "https://www.biddytarot.com/tarot-card-meanings/"


class BiddySpider(scrapy.Spider):
    """Scraper for biddytarot.com major and minor arcana card meanings."""

    name = "biddyspider"
    major_arcana_urls = [
        f"{BASE_URL}major-arcana/{major_arcana_card}"
        for major_arcana_card in MAJOR_ARCANA
    ]
    biddy_tarot_data = {}

    @staticmethod
    def build_minor_arcana_urls() -> List[str]:
        """Returns a list of all the minor arcana urls"""
        urls = []
        for minor_arcana_suit in MINOR_ARCANA:
            suit = minor_arcana_suit.rsplit("-", maxsplit=1)[-1]
            for minor_card in MINOR_CARDS:
                urls.append(
                    f"{BASE_URL}minor-arcana/{minor_arcana_suit}/{minor_card}-of-{suit}"
                )
        return urls

    def start_requests(self) -> Iterable[scrapy.Request]:
        for url in self.major_arcana_urls + self.build_minor_arcana_urls():
            yield scrapy.Request(url=url, callback=self.parse)

    def get_upright_text(self, response) -> Dict[str, str]:
        """Find and join Upright card texts"""
        texts = response.xpath(
            "//h2[contains(text(), 'Upright')]/following-sibling::p/text()"
        ).getall()
        return "".join(texts)

    def get_reversed_text(self, response) -> Dict[str, str]:
        """Find and join Reversed card texts"""
        texts = response.xpath(
            "//h2[contains(text(), 'Reversed')]/following-sibling::p/text()"
        ).getall()
        return "".join(texts)

    def keyword_xpath(self, card_direction, keyword_position) -> str:
        """Xpath string for finding the keywords of a card"""
        return (
            f"//h3[contains(text(), 'Keywords')]/following-sibling::p[{keyword_position}]/span"
            + f"[contains(text(), '{card_direction}')]/parent::p/text()"
        )

    def get_keywords_text(self, response) -> Dict[str, str]:
        """Find and join upright and reversed keywords card texts"""
        reversed_keywords = (
            response.xpath(self.keyword_xpath("UPRIGHT", 1)).get().strip()
        )
        upright_keywords = (
            response.xpath(self.keyword_xpath("REVERSED", 2)).get().strip()
        )
        return {
            "reversed": reversed_keywords,
            "upright": upright_keywords,
        }

    def get_card_description(self, response) -> str:
        """Find and join upright and reversed keywords card texts"""
        return response.xpath(
            "//h3[contains(text(), 'Description')]/following-sibling::p/text()"
        ).get()

    # pylint: disable=arguments-differ
    def parse(self, response):
        card_name = response.url.split("/")[-2]
        self.biddy_tarot_data[card_name] = {
            "description": self.get_card_description(response),
            "keywords": self.get_keywords_text(response),
            "upright": self.get_upright_text(response),
            "reversed": self.get_reversed_text(response),
        }

    def closed(self, reason="finished"):
        """Write the accumulated results to a JSON file once spider is done"""
        with open("biddytarot.json", "w", encoding="utf-8") as f:
            json.dump(self.biddy_tarot_data, f, ensure_ascii=False)
