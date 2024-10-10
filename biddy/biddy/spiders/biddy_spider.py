"""This module is for scraping biddytarot.com"""

from typing import Iterable, List
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
        yield scrapy.Request(url=self.major_arcana_urls[0], callback=self.parse)
        # for url in self.major_arcana_urls + self.build_minor_arcana_urls():
        # yield scrapy.Request(url=url, callback=self.parse)

    # pylint: disable=arguments-differ
    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f"quotes-{page}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")
        # for card in response.css(".tarot-card-summary"):
        #     yield {
        #         "name": card.css("h3::text").get(),
        #         "meaning": card.css("p::text").get(),
        #     }
