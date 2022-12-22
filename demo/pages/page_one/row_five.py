from fastapi import APIRouter
from zen_dash import instances as i


router = APIRouter(
    prefix="/backend/page_one/row_five",
    tags=["row_five"],
    responses={404: {"description": "Not found"}},
)


@router.post("/button_toggle", response_model=i.ReturnData)
async def d3():
    t =  i.ReturnData(type=i.InstanceType.BUTTON_TOGGLE,
                        title="Button Toggle",
                        button_toggle_data=i.ButtonToggleData(name="single_toggle_data",
                                                multi=False,
                                                data=[i.ButtonToggleInstance(label="Red", name="red", selected=True),
                                                      i.ButtonToggleInstance(label="Blue", name="blue"),
                                                      i.ButtonToggleInstance(label="Black", name="black")])
                        )
    return t


@router.post("/button_toggle_multiple", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.BUTTON_TOGGLE,
                        title="Button Toggle multiple",
                        button_toggle_data=i.ButtonToggleData(name="multi_toggle_data",
                                                multi=True,
                                                data=[i.ButtonToggleInstance(label="Red", name="red", selected=True),
                                                      i.ButtonToggleInstance(label="Blue", name="blue"),
                                                      i.ButtonToggleInstance(label="Black", name="black")]))


@router.post("/toggle", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.TOGGLE,
                        title="Toggle Example",
                        toggle_data=i.ToggleData(name="toggle_data",  checked=True)
                        )


@router.post("/multi_records", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.MULTI_LIST,
                        title="List Example",
                        multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url="/backend/page_one/row_five/button_toggle"), 
                                                     i.MultiURLInfo(name="button toggle multiple", url="/backend/page_one/row_five/button_toggle_multiple"),
                                                     i.MultiURLInfo(name = "toggle", url="/backend/page_one/row_five/toggle")])
                                                     )