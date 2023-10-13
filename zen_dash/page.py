
from typing import List
from zen_dash.objects import ZenPage
from zen_dash.objects.page import Instance, Row, Page


def get_page_dict(pages: List[ZenPage]):
    page_dict = {}
    custom_dict = {}
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
        
        if p.custom_url is not None:
            custom_dict[p.custom_url] = p
    return page_dict, custom_dict

def RenderPage(pages: List[ZenPage], fragment: str):
    PAGEDICT, CUSTOMDICT = get_page_dict(pages)
    p = PAGEDICT.get(fragment)
    p1 = CUSTOMDICT.get(fragment)

    if p:
        return p.page
    elif p1:
        return p1.page
    else:
        raise Exception("Page is not define")
