from fastapi import APIRouter
from zen_dash import instances as i
import random


router = APIRouter(
    prefix="/backend/page_one/row_one",
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)


@router.post("/first_box", response_model=i.ReturnData)
async def prf():
    d = random.choice([i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="person", name="Users", value="5,000"), footer="10% increase compare to last week ", flex=i.FlexData(fxFlex="25%")),
                       i.ReturnData(type=i.InstanceType.DATE, reactive=True, date_data=i.DateTimeData(label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"), flex=i.FlexData(fxFlex="20%"))])
    return d


@router.post("/second_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent", value="$5000"), footer="10% increase compare to last week ")


@router.post("/third_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent (last hour)", value="$400"))


@router.post("/forth_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="person", name="User (last hour)", value="100"))


@router.post("/date", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.DATE, date_data=i.DateTimeData(label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"))


@router.post("/single_date", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.DATE, date_data=i.DateTimeData(label="Select Date", name="single_date", first_date="2020-11-24"))
