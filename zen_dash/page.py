from enum import Enum
import optparse
from typing import List, Optional

from zen_dash.support import BaseUpdate


class Instance(BaseUpdate):
    url: str
    

class Row(BaseUpdate):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class Page(BaseUpdate):
    rows: List[Row]
