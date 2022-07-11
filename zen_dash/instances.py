from enum import Enum
from pydantic import BaseConfig, BaseModel
from typing import List, Optional, Dict, Union
from zen_dash.page import InstanceType

BaseConfig.arbitrary_types_allowed = True  # change #1

class BoxData(BaseModel):
    icon: str
    name: str
    value: str


class DateTimeData(BaseModel):
    label: str
    name: str
    first_date: str
    second_date: Optional[str]

class TableColumn(BaseModel):
    columnDef: str
    header: str

class TableData(BaseModel):
    columns: List[TableColumn]
    data: List[Dict]
    name: str
    
class ChartData(BaseModel):
    name: str
    data: Dict

class CheckBoxInstance(BaseModel):
    name: str
    selected: bool
    
class Style(Enum):
    horizontal = "Horizontal"
    vertical = "Vertical"

class CheckBoxData(BaseModel):
    data: List[CheckBoxInstance]
    style: Style = Style.horizontal
    name: str

class RadioData(BaseModel):
    data: List[str]
    style: Style = Style.horizontal
    name: str
    selected: Optional[str] = ""

class SliderData(BaseModel):
    name: str
    max: int
    min: int
    step: int
    thumbLabel: bool = True
    invert: bool = False
    vertical: bool = False

class ButtonToggleInstance(BaseModel):
    label: str
    name: str
    selected: bool = False

class ButtonToggleData(BaseModel):
    name: str
    multiple: bool = False
    data: List[ButtonToggleInstance]

class FilterDataInstance(BaseModel):
    name: str
    label: str

class GroupedFilterDataInstance(BaseModel):
    group_label: str
    group_data: List[str]


class GroupedFilterData(BaseModel):
    name: str
    label: str
    data: List[GroupedFilterDataInstance]


class SimpleFilterData(BaseModel):
    name: str
    label: str
    data: List[str]

class ReturnData(BaseModel):
    type:InstanceType
    title: Optional[str]
    chart_data: Optional[ChartData]
    filter_data: Optional[Union[GroupedFilterData, SimpleFilterData]]
    box_data: Optional[BoxData]
    date_data: Optional[DateTimeData]
    checkbox_data: Optional[CheckBoxData]
    radio_data: Optional[RadioData]
    slider_data: Optional[SliderData]
    button_toggle_data: Optional[ButtonToggleData]
    table_data: Optional[TableData]
    footer: Optional[str]

