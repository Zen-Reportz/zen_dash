from fastapi import APIRouter
from zen_dash import instances as i


router = APIRouter(
    prefix="/backend/page_one/row_four",
    tags=["row_four"],
    responses={404: {"description": "Not found"}},
)

@router.post("/slider", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Example",
                        slider_data=i.SliderData(name="slider_example", min=0, max=100, step=10, value=20, tick_interval=30)
                        )


@router.post("/slider_vertical", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Vertical Example",
                        slider_data=i.SliderData(name="slider_example_vertical", min=0, max=100, step=10, vertical=True))


@router.post("/slider_inverted", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Inverted Example",
                        slider_data=i.SliderData(name="slider_example_inverted", min=0, max=100, step=10, invert=True))


@router.post("/slider_vertical_inverted", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Vertical Inverted Example",
                        slider_data=i.SliderData(name="slider_example_vertical_inverted", min=0, max=100, step=10, vertical=True, invert=True))
