from typing import Optional, List, Union

from zen_dash.support import BaseUpdate
from importlib.metadata import version
from pydantic import validator

class SidebarTab(BaseUpdate):
    label: str
    icon: Optional[str] = 'Home'

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
        if not isinstance(v[0], SidebarTab):
            raise Exception("First tab can't be SidebarGroup")
        return v
            