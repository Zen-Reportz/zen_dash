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

