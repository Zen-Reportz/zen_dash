from typing import List
from fastapi import APIRouter
from zen_dash import instances as i
from fastapi.responses import FileResponse
import asyncio

from fastapi import UploadFile
import time

router = APIRouter(
    prefix="/backend/page_one/row_eight",
    tags=["row_eight"],
    responses={404: {"description": "Not found"}},
)

@router.post("/image", response_model=i.ReturnData)
async def d3():
    await asyncio.sleep(10)
    return i.ReturnData(type=i.InstanceType.IMAGE,
                       image_data= i.ImageData(url="/backend/page_one/row_eight/show_image", height="1000px", width="1000px"), flex=i.FlexData(fxFlex="50%", fxFlex_md="100%", fxFlex_sm="100%"))

@router.post("/show_image")
async def d3():
    await asyncio.sleep(10)
    file_path = "files/AuroraPillars_Correia_960.jpg"
    return FileResponse(path=file_path, filename=file_path)



@router.post("/highchart", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(
        type=i.InstanceType.HIGHCHART,
        highchart_data=i.HighChartData(config={
    "chart": {
      "type": 'line'
    },
    "title": {
      "text": 'Linechart'
    },
    "credits": {
      "enabled": False
    },
    "series": [
      {
        "name": 'Line 1',
        "data": [1, 2, 3, 5, 6, 7]
      }
    ]
  }), flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
    )