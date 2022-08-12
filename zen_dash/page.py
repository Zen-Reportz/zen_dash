from enum import Enum
import optparse
from pydantic import BaseModel
from typing import List, Tuple, Optional

from zen_dash.flex_data import FlexData



class InstanceType(Enum):
    """ Docstring for class InstanceType
    Instance Type required for ReturnData

    :return: Instance Type for Enum
    :rtype: Enum

    """
    DATE= "date"
    BOX = "box"
    TABLE = "table"
    CHART = "chart"
    CHECKBOX = "checkbox"
    RADIO = "radio"
    MIXED = "mixed"
    SIMPLE_FILTER = "simple_filter"
    GROUP_FILTER = "group_filter"
    SLIDER = "slider"
    BUTTON_TOGGLE = "button_toggle"
    TOGGLE = "toggle"
    MULTI_LIST = "multi_list"
    MULTI_TABS = "multi_tabs"
    MULTI_EXPAND = "multi_expand"


class Instance(BaseModel):
    url: str
    flex: Optional[FlexData ] = FlexData()
    

class Row(BaseModel):
    data: List[Instance]
    layoutGap: Optional[str] = "30px"

class Page(BaseModel):
    rows: List[Row]