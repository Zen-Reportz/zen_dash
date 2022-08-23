from enum import Enum
import optparse
from pydantic import BaseModel
from typing import List, Tuple, Optional

from zen_dash.flex_data import FlexData


class Instance(BaseModel):
    url: str
    flex: Optional[FlexData ] = FlexData()
    

class Row(BaseModel):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class Page(BaseModel):
    rows: List[Row]