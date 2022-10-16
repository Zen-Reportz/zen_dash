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
    return i.ReturnData(type=i.InstanceType.IMAGE,
                       image_data= i.ImageData(url="/backend/page_one/row_eight/show_image", height="1000px", width="1000px"), flex=i.FlexData(fxFlex="50%", fxFlex_md="100%", fxFlex_sm="100%"))

@router.post("/show_image")
async def d3():
    file_path = "files/AuroraPillars_Correia_960.jpg"
    return FileResponse(path=file_path, filename=file_path)



@router.post("/highchart", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(
        type=i.InstanceType.HIGHCHART,
        highchart_data=i.HighChartData(config={
    
    "chart": {
        "type": 'area'
    },
    "accessibility": {
        "description": 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    "title": {
        "text": 'US and USSR nuclear stockpiles'
    },
    "subtitle": {
        "text": 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
            'target="_blank">FAS</a>'
    },
    "xAxis": {
        "allowDecimals": "false",
        "labels": {
            "formatter": """ ( function () {
                return this.value; 
                } ) """
            },
        "accessibility": {
            "rangeDescription": 'Range: 1940 to 2017.'
        }
    },
    "yAxis": {
        "title": {
            "text": 'Nuclear weapon states'
        },
        "labels": {
            "formatter": """ ( function () {
                return this.value / 1000 + 'k';
                }) """
            }
    },
    "tooltip": {
        "pointFormat": "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}"
    },
    "plotOptions": {
        "area": {
            "pointStart": 1940,
            "marker": {
                "enabled": "false",
                "symbol": 'circle',
                "radius": 2,
                "states": {
                    "hover": {
                        "enabled": "true"
                    }
                }
            }
        }
    },
    "series": [{
        "name": 'USA',
        "data": [
            None, None, None, None, None, 2, 9, 13, 50, 170, 299, 438, 841,
            1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
            28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
            26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
            23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
            21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
            10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
            5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
            3750, 3708, 3708
        ]
    }, {
        "name": 'USSR/Russia',
        "data": [None, None, None, None, None, None, None, None, None,
            1, 5, 25, 50, 120, 150, 200, 426, 660, 863, 1048, 1627, 2492,
            3346, 4259, 5242, 6144, 7091, 8400, 9490, 10671, 11736, 13279,
            14600, 15878, 17286, 19235, 22165, 24281, 26169, 28258, 30665,
            32146, 33486, 35130, 36825, 38582, 40159, 38107, 36538, 35078,
            32980, 29154, 26734, 24403, 21339, 18179, 15942, 15442, 14368,
            13188, 12188, 11152, 10114, 9076, 8038, 7000, 6643, 6286, 5929,
            5527, 5215, 4858, 4750, 4650, 4600, 4500, 4490, 4300, 4350, 4330,
            4310, 4495, 4477
        ]
    }]
    })
 
  , flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
    )



@router.post("/highchart2", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(
        type=i.InstanceType.HIGHCHART,
        highchart_data=i.HighChartData(config={
       "xAxis": {
            "type": 'datetime',
            "dateTimeLabelFormats": {
                "day": '%e %b %y',
            },
            "min":"new Date(2010, 0, 1).getTime()",
            "max":"new Date(2010, 0, 10).getTime()"
        },
        "series": [{
            "data": [
                ["new Date(2010, 0, 1).getTime()", 29.9],
                ["new Date(2010, 0, 2).getTime()", 71.5],
                ["new Date(2010, 0, 3).getTime()", 106.4],
                ["new Date(2010, 0, 7).getTime()", 129.2],
                ["new Date(2010, 0, 8).getTime()", 144.0],
                ["new Date(2010, 0, 9).getTime()", 176.0]
             ]
        }]

    })
 
  , flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
    )