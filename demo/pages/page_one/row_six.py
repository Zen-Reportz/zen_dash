from fastapi import APIRouter
from zen_dash import instances as i
from zen_dash.flex_data import FlexData


router = APIRouter(
    prefix="/backend/page_one/row_six",
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)

@router.post("/multi_records_tabs", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.MULTI_TABS,
                        title="Multi Tabs",
                       multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url="/backend/page_one/row_five/button_toggle"), 
                                                     i.MultiURLInfo(name="button toggle multiple", url="/backend/page_one/row_five/button_toggle_multiple"),
                                                     i.MultiURLInfo(name = "toggle", url="/backend/page_one/row_five/toggle")]), flex=FlexData(fxFlex="27%")
                                                     
                    )


@router.post("/multi_records_expanded", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.MULTI_EXPAND,
                        title="Multi Expands",
                       multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url="/backend/page_one/row_five/button_toggle"), 
                                                     i.MultiURLInfo(name="button toggle multiple", url="/backend/page_one/row_five/button_toggle_multiple"),
                                                     i.MultiURLInfo(name = "toggle", url="/backend/page_one/row_five/toggle")])
                                                     
                    )