import optparse
from pydantic import BaseModel
from typing import List, Tuple, Optional


class Instance(BaseModel):
    type: str
    url: str
    fxFlex: Optional[str] = "20%" 
    fxFlex_md: Optional[str] = "33%"
    fxFlex_sm: Optional[str] = "50%" 
    fxFlex_xs: Optional[str] = "100%" 


class Row(BaseModel):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class Page(BaseModel):
    rows: List[Row]