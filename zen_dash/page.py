from enum import Enum
import optparse
from pydantic import BaseModel
from typing import List, Tuple, Optional


class InstanceType(Enum):
    DATE= "date"
    BOX = "box"
    TABLE = "table"
    CHART = "chart"
    CHECKBOX = "checkbox"
    RADIO = "radio"
    MIXED = "mixed"
    FILTER = "filter"
    FILTER_GROUP = "filter_group"
    MULTI_FILTER = "multi_filter"
    MULTI_FILTER_GROUP = "multi_filter_group"
    SLIDER = "slider"
    BUTTON_TOGGLE = "button_toggle"
    TOGGLE = "toggle"


class SubInstanceType(Enum):
    LIST = "list"
    TAB = "tab"
    PANEL = "pannel"

class Instance(BaseModel):
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