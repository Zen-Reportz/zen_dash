from fastapi import APIRouter
from zen_dash import instances as i


router = APIRouter(
    prefix="/backend/page_one/row_three",
    tags=["row_three"],
    responses={404: {"description": "Not found"}},
)



@router.post("/checkbox", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.CHECKBOX,
                        title="CheckBox Example",
                        checkbox_data=i.CheckBoxData(data=[i.CheckBoxInstance(name="Option 1", selected=False),
                                                  i.CheckBoxInstance(
                                                      name="Option 2", selected=False),
                                                  i.CheckBoxInstance(name="Option 3", selected=False)],
                                            style=i.Style.horizontal, name="check_box_example"))


@router.post("/checkbox_vertical", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.CHECKBOX,
                        title="CheckBox Vertical Example",
                        checkbox_data=i.CheckBoxData(data=[i.CheckBoxInstance(name="Option 1", selected=True),
                                                  i.CheckBoxInstance(
                                                      name="Option 2", selected=False),
                                                  i.CheckBoxInstance(name="Option 3", selected=False)],
                                            style=i.Style.vertical,
                                            name="check_box_example_1"))


@router.post("/radiobox", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.RADIO,
                        title="Radio Example",
                        radio_data=i.RadioData(data=["Option 1", "Option 2", "Option 3"],
                                         style=i.Style.horizontal,
                                         name="radio_example_1"))


@router.post("/radiobox_vertical", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.RADIO,
                        title="Radio Example Vertical",
                        radio_data=i.RadioData(data=["Option 1", "Option 2", "Option 3"],
                                         style=i.Style.vertical,
                                         name="radio_example_2",
                                         selected="Option 1"))
