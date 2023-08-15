from enum import Enum
from typing import List, Optional

from zen_dash.support import BaseUpdate
from typing import Dict

class Instance(BaseUpdate):
    url: str

class Row(BaseUpdate):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class FABURL(BaseUpdate):
    url: str

class Page(BaseUpdate):
    rows: List[Row]
    floating_button_url: List[FABURL] = []
