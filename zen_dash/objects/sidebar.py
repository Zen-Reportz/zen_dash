from typing import Optional, List, Union
from zen_dash.objects import ZenPage
import warnings
from zen_dash.support import BaseUpdate
from importlib.metadata import version
from pydantic import root_validator, validator

class SidebarTab(BaseUpdate):
    label: str
    icon: Optional[str] = 'Home'
    custom_url: Optional[str]

    

class SidebarGroup(BaseUpdate):
    name: str
    subtabs: List[SidebarTab]

class FilterInfo(BaseUpdate):
    url: str

class Sidebar(BaseUpdate):
   
    tabs: List[Union[SidebarTab, SidebarGroup]]
    filters: List[FilterInfo]
    size: str = '300px'
    library_version: str = version("zen-dash")

    @validator('tabs')
    def first_cant_be_group(cls, v):
        if len(v)> 1:
            if not isinstance(v[0], SidebarTab):
                raise Exception("First tab can't be SidebarGroup")
        return v


class GroupSidebarList(BaseUpdate):
    name: str
    sub_pages: List[ZenPage]

class SidebarList(BaseUpdate):
    pages: List[ZenPage]
    groupSidebar: List[GroupSidebarList]


def get_page_dict(pages: List[ZenPage]):
    page_dict = {}
    for p in pages:
        if p.tab_number is None:
            raise Exception("Tab number is not define in Zen Page")
        
        page_number = p.tab_number
        if p.subtab_number is None:
            
            page_dict[page_number] = p
        else:
            if page_dict.get(page_number) is None:
                page_dict[page_number] = {}
            elif isinstance(page_dict.get(page_number), dict):
                pass
            elif not isinstance(page_dict.get(page_number), dict):
                raise Exception(f"Please Check tab_number and subtab_number")
            
            sub_number = p.subtab_number
            page_dict[page_number][sub_number] = p
    return page_dict

def RenderTabs(sidebar_list: SidebarList):
    tabs = []
    
    for p in sidebar_list.pages:
        if p.subtab_number:
            raise Exception("Sidetab can't have subtab_number")
        
        if p.custom_url:
            url = p.custom_url
        else:
            url = f"page_{p.tab_number}"
        
        tabs.append(SidebarTab(label=p.name, icon=p.icon, custom_url=url))
    
    for subtab in sidebar_list.groupSidebar:
        sub_tab = []
        for sub_page in subtab.sub_pages:
            if sub_page.subtab_number is None:
                raise Exception(f"Please provde subpage for {sub_page.name}")
            if sub_page.custom_url:
                url = sub_page.custom_url
            else:
                url = f"page_{sub_page.tab_number}_{sub_page.subtab_number}"
            
            sub_tab.append(SidebarTab(label=sub_page.name, icon=sub_page.icon, custom_url=url))
        
        tabs.append(SidebarGroup(name= subtab.name, subtabs=sub_tab))

    return tabs







    