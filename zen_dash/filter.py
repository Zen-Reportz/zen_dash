from ctypes.wintypes import tagMSG
from pydantic import BaseModel
from typing import Optional, List, Any
from pydantic import BaseConfig
BaseConfig.arbitrary_types_allowed = True  # change #1

class Filter(BaseModel):
    name: str
    label: str
    url: str
    single: bool = True
    grouped: bool = False 

class DataInstance(BaseModel):
    name: str
    group_data: List[str]

class GroupData(BaseModel):
    data: List[DataInstance]


class SimpleData(BaseModel):
    data:  List[str]
