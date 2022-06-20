from lib2to3.pytree import Base
from pydantic import BaseModel
from typing import List, Optional, Dict

class BoxData(BaseModel):
    icon: str
    name: str
    value: str
    additional_info: Optional[str]

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
