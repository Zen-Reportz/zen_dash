from typing import List, Optional, Type
from pydantic import BaseModel

from zen_dash.page import Page


class Zen:

    @staticmethod
    def full_url() -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def url() -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def view():
        raise Exception("Not Implimented")

    @staticmethod
    def server_full_url() -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def server_url() -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def server_view():
        raise Exception("Not Implimented")

    @staticmethod
    def server():
        raise Exception("Not Implimented")


class ZenPage(BaseModel):
    name: str
    icon: str
    page: Page
    websocket_calls: List[Type[Zen]] = []
    pydantic_class: Type[BaseModel] = None
    tab_number: int
    subtab_number: Optional[int]


def get_page_dict(pages: List[ZenPage]):
    page_dict = {}
    for p in pages:
        if p.subtab_number is None:
            page_number = f"page_{p.tab_number}"
        else:
            page_number = f"page_{p.tab_number}_{p.subtab_number}"
        if page_dict.get(page_number):
            raise Exception(
                f"{page_dict.get(page_number)} and {p} pages are assing to same tab/subtab")

        else:
            page_dict[page_number] = p
    return page_dict


class Configuration(BaseModel):
    retry_count: int = 2
    show_right_sidebar: bool = False
    activate_websocket: bool = False