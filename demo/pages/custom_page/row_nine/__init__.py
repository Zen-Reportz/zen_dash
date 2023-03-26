from fastapi import APIRouter
from pages.custom_page.row_nine import view as v
from zen_dash import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_nine"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.IFrame.url(), response_model=i.ReturnData)
async def d3():
    return v.IFrame.view()


@router.post(v.CustomHTML.url(), response_model=i.ReturnData)
async def d3():
    return v.CustomHTML.view()


@router.post(v.FullCustomHTML.url(), response_model=i.ReturnData)
async def d3():
    return v.FullCustomHTML.view()

@router.post(v.NewMethod.url(), response_model=i.ReturnData)
async def d3():
    t = v.NewMethod.view()
    print(t)
    return t
