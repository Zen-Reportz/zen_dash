from enum import Enum
from re import T
from pydantic import BaseConfig, BaseModel
from typing import List, Optional, Dict
from zen_dash.flex_data import FlexData

BaseConfig.arbitrary_types_allowed = True  # change #1



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
    SIMPLE_SERVER_FILTER = "simple_server_filter"
    GROUP_FILTER = "group_filter"
    SLIDER = "slider"
    BUTTON_TOGGLE = "button_toggle"
    TOGGLE = "toggle"
    MULTI_LIST = "multi_list"
    MULTI_TABS = "multi_tabs"
    MULTI_EXPAND = "multi_expand"
    INPUT = "input"
    DOWNLOAD = "download"
    UPLOAD = "upload"
    IMAGE = "image"
    HIGHCHART = "highchart"

class BoxData(BaseModel):
    icon: str
    name: str
    value: str


class DateTimeData(BaseModel):
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
    name: str
    selected: bool = False

class ButtonToggleData(BaseModel):
    name: str
    multi: bool = False
    data: List[ButtonToggleInstance]


class GroupedFilterDataInstance(BaseModel):
    group_name: str
    group_data: List[str]

class InputData(BaseModel):
    label: Optional[str]
    name: str


class GroupedFilterData(BaseModel):
    multi: bool = False
    name: str
    url: Optional[str]
    data: List[GroupedFilterDataInstance]


class SimpleFilterData(BaseModel):
    multi: bool = False
    name: str
    data: List[str]

class SimpleServerSideFilterData(SimpleFilterData):
    url: Optional[str]


class ToggleData(BaseModel):
    data: bool
    name: str


class MultiURLInfo(BaseModel):
    name: Optional[str]
    with_card: bool = False
    url: str

class MultiData(BaseModel):
    urls: List[MultiURLInfo]



class ReactiveData(BaseModel):
    full_rective: Optional[bool] = False
    ids: Optional[List[str]] = []

class DownloadData(BaseModel):
    file_name: str
    url: str

class ImageData(BaseModel):
    url: str
    height: str
    width: str

class UploadData(BaseModel):
    url: str
    multi: bool=  False
    name: str

class HighChartData(BaseModel):
    config: dict


class ReturnData(BaseModel):
    """
    Main return object use for everything except /backend/page_detail, /backend/sidebar, and /backend/title
    depdning upon which type (InstanceType) you select, you have to select corsponding return value 

    for example, if you select BOX as input, you have to choose box_data as one of  input.

    Example: i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent", value="$5000"), footer="10% increase compare to last week ")

    :param type: InstanceType this will dectate what type of output will be render
    :param title: Optional[str] tile of mat box in which output will be render
    
    """

    type:InstanceType
    title: Optional[str]
    reactive: Optional[ReactiveData] = ReactiveData()
    chart_data: Optional[ChartData]
    box_data: Optional[BoxData]
    date_data: Optional[DateTimeData]
    checkbox_data: Optional[CheckBoxData]
    radio_data: Optional[RadioData]
    slider_data: Optional[SliderData]
    button_toggle_data: Optional[ButtonToggleData]
    table_data: Optional[TableData]
    toggle_data: Optional[ToggleData]
    multi_data: Optional[MultiData]
    simple_filter_data: Optional[SimpleFilterData] 
    simple_server_filter_data: Optional[SimpleServerSideFilterData] 
    group_filter_data: Optional[GroupedFilterData ]
    input_data: Optional[InputData]
    download_data: Optional[DownloadData]
    upload_data: Optional[UploadData]
    image_data: Optional[ImageData]
    highchart_data: Optional[HighChartData]

    footer: Optional[str]
    flex: Optional[FlexData] = FlexData()


class UpdateInstanceType(Enum):
    """ Docstring for class UpdateInstanceType
    Instance Type required for UpdateReturnData

    :return: Update Instance Type for Enum
    :rtype: Enum

    """
    SIMPLE_FILTER = "simple_filter"




class UpdateReturnData(BaseModel):
    type: UpdateInstanceType
    simple_fitler_data: Optional[List[str]]
    
