from fastapi import APIRouter, Request
from zen_dash import instances as i
import random


router = APIRouter(
    prefix="/backend/page_one/row_one",
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)


@router.post("/first_box", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="person", name="Users", value="5000"), footer="5% increase compare to last week ")


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
async def prf(req: Request):    
    if data.get("single_toggle_data", '') == 'black':
        return i.ReturnData(type=i.InstanceType.DATE, 
                        date_data=i.DateTimeData(label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"), 
                        reactive=i.ReactiveData(hidden=True, reactive_ids=['single_toggle_data']))

    return i.ReturnData(type=i.InstanceType.DATE, 
                        date_data=i.DateTimeData(label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"), 
                        reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']))


@router.post("/single_date", response_model=i.ReturnData)
async def prf():

    d = [i.ReturnData(type=i.InstanceType.DATE,  
            date_data=i.DateTimeData(label="Select Date", name="single_date", first_date="2020-02-10"), 
            reactive=i.ReactiveData( reactive_ids=['multi_toggle_data'])),
        i.ReturnData(type=i.InstanceType.DATE, 
            date_data=i.DateTimeData(label="Select Date", name="single_date", first_date="2023-03-24"), 
            reactive=i.ReactiveData(reactive_ids=['multi_toggle_data']
        ))]

    return random.choice(d)
