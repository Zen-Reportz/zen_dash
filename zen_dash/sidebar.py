from pydantic import BaseModel
from typing import Optional, List


class SidebarTab(BaseModel):
    label: str
    icon: Optional[str] = 'Home'
    fragment: str

class FilterInfo(BaseModel):
    url: str
    
class Sidebar(BaseModel):
    tabs: List[SidebarTab]
    filters: List[FilterInfo]
