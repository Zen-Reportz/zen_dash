from fastapi import APIRouter
from pages.input_page.row_six import view as v
from zen_dash import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)


@router.post(v.MutiRecordsTabs.url(), response_model=i.ReturnData)
async def mrt():
    return v.MutiRecordsTabs.view()


@router.post(v.MutiRecordsExpand.url(), response_model=i.ReturnData)
async def d3():
    return v.MutiRecordsExpand.view()