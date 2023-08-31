from fastapi import APIRouter
from pages.chart_page.row_eight import view as v
from zen_dash.objects import instances as i
from zen_dash import Zen


router = APIRouter(
    prefix=v.prefix,
    tags=["row_eight"],
    responses={404: {"description": "Not found"}},
)


@router.post(v.Image.url(), response_model=i.ReturnData)
async def d3():
    return v.Image.view()

@router.post(v.File.url())
async def d3():
    return v.File.view()

@router.post(v.Highchart.url(), response_model=i.ReturnData)
async def d3():
    return v.Highchart.view()

@router.post(v.Highchart2.url(), response_model=i.ReturnData)
async def d3():
    return v.Highchart2.view()

@router.post(v.HighchartStock.url(), response_model=i.ReturnData)
async def d3():
    return v.HighchartStock.view()

@router.post(v.HighchartMap.url(), response_model=i.ReturnData)
async def d3():
    return v.HighchartMap.view()
