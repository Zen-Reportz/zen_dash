from fastapi import APIRouter, Request
from pages.input_page.row_three import view as v
from zen_dash import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.CheckBox.url(), response_model=i.ReturnData)
async def form():
    return v.CheckBox.view()

@router.post(v.CheckBoxVertical.url(), response_model=i.ReturnData)
async def form():
    return v.CheckBoxVertical.view()

@router.post(v.RadioBox.url(), response_model=i.ReturnData)
async def form():
    return v.RadioBox.view()

@router.post(v.RadioBoxVertical.url(), response_model=i.ReturnData)
async def form():
    return v.RadioBoxVertical.view()