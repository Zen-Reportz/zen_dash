
from typing import List
from zen_dash.objects import ZenPage
from zen_dash.objects.page import Instance, Row, Page


def get_page_dict(pages: List[ZenPage]):
    page_dict = {}
    for p in pages:
        if p.tab_number is None:
            raise Exception("Tab number is not define in Zen Page")
        
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

def RenderPage(pages: List[ZenPage], fragment: str):
    PAGEDICT = get_page_dict(pages)
    p = PAGEDICT.get(fragment)
    if p:
        return p.page
    else:
        raise Exception("Page is not define")
