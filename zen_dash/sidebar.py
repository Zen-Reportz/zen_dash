from typing import Optional, List

from zen_dash.support import BaseUpdate


class SidebarTab(BaseUpdate):
    label: str
    icon: Optional[str] = 'Home'

class FilterInfo(BaseUpdate):
    url: str
    
class Sidebar(BaseUpdate):
    tabs: List[SidebarTab]
    filters: List[FilterInfo]
    size: str = '300px'
