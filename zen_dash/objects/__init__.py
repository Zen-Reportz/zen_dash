from typing import Dict, List, Optional, Type
from pydantic import BaseModel, root_validator

from zen_dash.objects.page import Page


class Zen:

    @staticmethod
    def full_url(*args, **kwargs) -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def url(*args, **kwargs) -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def view(*args, **kwargs):
        raise Exception("Not Implimented")

    @staticmethod
    def server_full_url(*args, **kwargs) -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def server_url(*args, **kwargs) -> str:
        raise Exception("Not Implimented")

    @staticmethod
    def server_view(*args, **kwargs):
        raise Exception("Not Implimented")

    @staticmethod
    def server(*args, **kwargs):
        raise Exception("Not Implimented")


class ZenPage(BaseModel):
    name: str
    icon: str
    page: Page
    websocket_calls: List[Type[Zen]] = []
    pydantic_class: Type[BaseModel] = None
    tab_number: Optional[int]
    subtab_number: Optional[int]
    custom_url: Optional[str]

class RefreshInfo(BaseModel):
    refresh: bool = False
    rate_in_seconds: int =  5*60

class WebSocketConfig(BaseModel):
    active: bool = False

class Auth(BaseModel):
    SSO: bool = False
    UP_Login: bool = False
    

class Configuration(BaseModel):
    retry_count: int = 2
    show_right_sidebar: bool = False
    refresh: RefreshInfo =  RefreshInfo()
    websocket: WebSocketConfig = WebSocketConfig()
    auth: Auth = Auth() 
