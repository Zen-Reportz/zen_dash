from enum import Enum
import optparse
from pydantic import BaseModel
from typing import List, Tuple, Optional


class Instance(BaseModel):
    url: str
    

class Row(BaseModel):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class Page(BaseModel):
    rows: List[Row]