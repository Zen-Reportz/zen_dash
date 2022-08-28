
from typing import Optional
from pydantic import BaseConfig, BaseModel


class FlexData(BaseModel):
    fxFlex: Optional[str] = "18%" 
    fxFlex_md: Optional[str] = "33%"
    fxFlex_sm: Optional[str] = "50%" 
    fxFlex_xs: Optional[str] = "100%" 