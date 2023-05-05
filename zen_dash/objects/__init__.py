from typing import List, Optional, Type
from pydantic import BaseModel

from zen_dash.objects.page import Page


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
    tab_number: Optional[int]
    subtab_number: Optional[int]


class WebSocketConfig(BaseModel):
    acitve: bool = False
    refresh_seconds: int = 5*60

class Configuration(BaseModel):
    retry_count: int = 2
    show_right_sidebar: bool = False
    websocket: WebSocketConfig = WebSocketConfig()