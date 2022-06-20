from pydantic import BaseModel
from typing import Optional, List

from zen_dash.filter import Filter

class SidebarTab(BaseModel):
    name: str
    icon: Optional[str] = 'Home'
    url: str

class Sidebar(BaseModel):
    tabs: List[SidebarTab]
    filters: List[Filter]
