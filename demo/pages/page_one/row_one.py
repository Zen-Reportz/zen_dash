from fastapi import APIRouter, Request
from zen_dash import instances as i
import random
from zen_dash import page as p


router = APIRouter(
    prefix="/backend/page_one/row_one",
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)

RETRY = 0
@router.post("/first_box", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf(req: Request):
    global RETRY
    if RETRY < 2:
        RETRY += 1
        raise Exception("test")

    if (req.query_params):
        flex = i.FlexData(fxFlex="50%", fxFlex_md="50%")
        dialog_data = None
    else:
        flex = i.FlexData()
        dialog_data=i.DialogBox(url="/backend/page_one/row_one/first_box_dialog", height="70%", width="70%")
    

    return i.ReturnData(type=i.InstanceType.BOX, 
                        box_data=i.BoxData(icon="person", name="Users", value="5000"),
                        footer="5% increase compare to last week ", 
                        tooltip_data=i.ToolTipData(label="my label", disable=False), 
                        dialog_data=dialog_data,
                        flex=flex
                        )


@router.post("/first_box_dialog", response_model=p.Page, response_model_exclude_none=True)
async def prf():
    return p.Page(
        rows=[
            p.Row(data=[
                p.Instance(url="/backend/page_one/row_one/first_box?dialogbox"),
                p.Instance(url="/backend/page_one/row_one/second_box?dialogbox"),
                p.Instance(url="/backend/page_one/row_one/forth_box?dialogbox")])])


@router.post("/second_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="percent", name="User Spent", value="$5000"), footer="10% increase compare to last week ")


@router.post("/forth_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent Total", value="$2000"))


@router.post("/third_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent (last hour)", value="$400"))


@router.post("/forth_box", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="person", name="User (last hour)", value="100"))


@router.post("/date", response_model=i.ReturnData)
async def prf(req: Request):
    data = await req.json()
    if data.get("single_toggle_data", '') == 'black':
        return i.ReturnData(type=i.InstanceType.DATE,
                            date_data=i.DateTimeData(
                                label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"),
                            reactive=i.ReactiveData(hidden=True, reactive_ids=['single_toggle_data'])
                            )

    t = [i.ReturnData(type=i.InstanceType.DATE,
                      date_data=i.DateTimeData(
                          label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"),
                      reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']), flex=i.FlexData(fxFlex='25%', fxFlex_md='50%', fxFlex_sm='100%', fxFlex_xs='100%')),
         i.ReturnData(type=i.InstanceType.DATE,
                      date_data=i.DateTimeData(
                          label="Select Date Range", name="multi_date", first_date="2020-11-10", second_date="2022-03-24"),
                      reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']))]
    return random.choice(t)


@router.post("/single_date", response_model=i.ReturnData)
async def prf():

    d = [i.ReturnData(type=i.InstanceType.DATE,
                      date_data=i.DateTimeData(
                          label="Select Date", name="single_date", first_date="2020-02-10"),
                      reactive=i.ReactiveData(reactive_ids=['multi_toggle_data'])),
         i.ReturnData(type=i.InstanceType.DATE,
                      date_data=i.DateTimeData(
                          label="Select Date", name="single_date", first_date="2023-03-24"),
                      reactive=i.ReactiveData(reactive_ids=['multi_toggle_data']
                                              ), flex=i.FlexData(fxFlex='25%', fxFlex_md='50%', fxFlex_sm='100%', fxFlex_xs='100%'))]

    return random.choice(d)
