from enum import Enum
from re import T
from pydantic import BaseConfig
from typing import List, Optional, Dict, Union
from zen_dash.flex_data import FlexData
from zen_dash.support import BaseUpdate

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
    DATATABLE = "data_table"
    IFRAME = "iframe"
    CUSTOM_HTML="custom_html"

class BoxData(BaseUpdate):
    icon: str
    name: str
    value: str


class DateTimeData(BaseUpdate):
    name: str
    first_date: str
    second_date: Optional[str]

class TableColumn(BaseUpdate):
    columnDef: str
    header: str

class TableData(BaseUpdate):
    columns: List[TableColumn]
    data: List[Dict]
    name: str
    
class ChartData(BaseUpdate):
    name: str
    data: Dict

class CheckBoxInstance(BaseUpdate):
    name: str
    selected: bool
    
class Style(Enum):
    horizontal = "Horizontal"
    vertical = "Vertical"

class CheckBoxData(BaseUpdate):
    data: List[CheckBoxInstance]
    style: Style = Style.horizontal
    name: str

class RadioData(BaseUpdate):
    data: List[str]
    style: Style = Style.horizontal
    name: str
    selected: Optional[str] = ""

class SliderData(BaseUpdate):
    name: str
    max: float
    min: float
    step: float
    thumbLabel: bool = True
    invert: bool = False
    vertical: bool = False
    value: Optional[float]

class ButtonToggleInstance(BaseUpdate):
    name: str
    selected: bool = False

class ButtonToggleData(BaseUpdate):
    name: str
    multi: bool = False
    data: List[ButtonToggleInstance]


class GroupedFilterDataInstance(BaseUpdate):
    group_name: str
    group_data: List[str]

class InputData(BaseUpdate):
    label: Optional[str]
    name: str
    value: Optional[str]


class GroupedFilterData(BaseUpdate):
    multi: bool = False
    name: str
    url: Optional[str]
    data: List[GroupedFilterDataInstance]
    selected: List[str] = []


class SimpleFilterData(BaseUpdate):
    multi: bool = False
    name: str
    data: List[str]
    selected: List[str] = []

class SimpleServerSideFilterData(SimpleFilterData):
    url: Optional[str]


class ToggleData(BaseUpdate):
    name: str
    checked: bool = False


class MultiURLInfo(BaseUpdate):
    name: Optional[str]
    with_card: bool = False
    url: str

class MultiData(BaseUpdate):
    urls: List[MultiURLInfo]


class ReactiveData(BaseUpdate):
    full_rective: Optional[bool] = False
    reactive_ids: Optional[List[str]] = []
    hidden: bool = False

class DownloadData(BaseUpdate):
    label: str
    url: str
    name: str

class ImageData(BaseUpdate):
    url: str
    height: str
    width: str

class UploadData(BaseUpdate):
    url: str
    multi: bool=  False
    name: str


class HighChartData(BaseUpdate):
    config: Dict

class IframeData(BaseUpdate):
    url: str
    width: str = "1100"
    height: str = "400"

class ToolTipData(BaseUpdate):
    label: str = ''

class DialogBox(BaseUpdate):
    url: str = ''
    height: str = '60%'
    width: str = '60%'

class CustomHTML(BaseUpdate):
    name: str
    html: str
    full_custom: bool = False
    script: Optional[str]


class ReturnData(BaseUpdate):
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
    iframe_data: Optional[IframeData]
    custom_html_data: Optional[CustomHTML]
    footer: Optional[str]
    flex: Optional[FlexData] = FlexData()
    reactive: Optional[ReactiveData] = ReactiveData()
    tooltip_data: Optional[ToolTipData]
    dialog_data: Optional[DialogBox]

class UpdateInstanceType(Enum):
    """ Docstring for class UpdateInstanceType
    Instance Type required for UpdateReturnData

    :return: Update Instance Type for Enum
    :rtype: Enum

    """
    SIMPLE_FILTER = "simple_filter"




class UpdateReturnData(BaseUpdate):
    type: UpdateInstanceType
    simple_fitler_data: Optional[List[str]]
    
