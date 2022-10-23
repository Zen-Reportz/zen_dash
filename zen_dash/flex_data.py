
from typing import Optional
from zen_dash.support import BaseUpdate


class FlexData(BaseUpdate):
    fxFlex: Optional[str] = "18%" 
    fxFlex_md: Optional[str] = "33%"
    fxFlex_sm: Optional[str] = "50%" 
    fxFlex_xs: Optional[str] = "100%" 
    class Config:
        exclude_none=True