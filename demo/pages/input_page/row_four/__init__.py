from fastapi import APIRouter
from pages.input_page.row_four import view as v
from zen_dash import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_four"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.Slider.url(), response_model=i.ReturnData)
async def d3():
    return await v.Slider.view()

@router.post(v.SliderVertical.url(), response_model=i.ReturnData)
async def d3():
    return await v.SliderVertical.view()

@router.post(v.SliderInverted.url(), response_model=i.ReturnData)
async def d3():
    return await v.SliderInverted.view()

@router.post(v.SliderVerticalInverted.url(), response_model=i.ReturnData)
async def d3():
    return await v.SliderVerticalInverted.view()