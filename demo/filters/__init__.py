from time import sleep
from fastapi import APIRouter, Request
from zen_dash import instances as i

import random
import string

router = APIRouter(
    prefix="/backend/filters",
    tags=["filters"],
    responses={404: {"description": "Not found"}},
)


@router.post("/single_filter", response_model=i.ReturnData)
async def single_filter():
    s = i.ReturnData(
        title="Simple Filter",
        type=i.InstanceType.SIMPLE_FILTER,
        simple_filter_data=i.SimpleFilterData(
            name="simple_filter",
            data=["Test 1", "My 2"],
            selected=['Test 1'])
    )

    return s


@router.post("/single_filter_server", response_model=i.ReturnData)
async def single_filter():
    s = i.ReturnData(
        title="Simple Filter Server side",
        type=i.InstanceType.SIMPLE_SERVER_FILTER,
        simple_server_filter_data=i.SimpleServerSideFilterData(
            name="simple_filter_server",
            data=["Test 1", "My 2"],
            url="/backend/filters/my_data_filter",
            selected=["Test 1"]
        )
    )

    return s


@router.post("/my_data_filter", response_model=i.UpdateReturnData)
async def single_filter(request: Request):
    # dd = await request.json()
    # print(dd)
    # key = dd.get("simple_server_filter_data", "missing")
    s = i.UpdateReturnData(type=i.UpdateInstanceType.SIMPLE_FILTER,
                           simple_fitler_data=[''.join(random.choices(
                               string.ascii_uppercase + string.digits, k=10)) for _ in range(20)]
                           )
    return s


@router.post("/multi_filter", response_model=i.ReturnData)
async def multi_filter():
    return i.ReturnData(
        title="Multi Filter",
        type=i.InstanceType.SIMPLE_FILTER,
        simple_filter_data=i.SimpleFilterData(name="Simple Multi Filter",
                                              multi=True,
                                              data=["Option 1", "Option 2"],
                                              selected=['Option 2', "Option 1"]))


@router.post("/multi_filter_server", response_model=i.ReturnData)
async def multi_filter():
    return i.ReturnData(
        title="Multi Filter Server",
        type=i.InstanceType.SIMPLE_SERVER_FILTER,
        simple_server_filter_data=i.SimpleServerSideFilterData(name="Simple Multi server filter",
                                                               multi=True,
                                                               data=[
                                                                   "Option 1", "Option 2"],
                                                               url="/backend/filters/my_data_filter",
                                                               selected=["Option 1", "Option 2"]))


@router.post("/single_filter_group", response_model=i.ReturnData)
async def single_filter_group():
    return i.ReturnData(
        title="Single Filter Group",
        type=i.InstanceType.GROUP_FILTER,
        group_filter_data=i.GroupedFilterData(name="Group Simple Filter",
                                              data=[i.GroupedFilterDataInstance(group_name="Group", group_data=["Option 1", "Option 2"]),
                                                    i.GroupedFilterDataInstance(group_name="Group 2", group_data=[
                                                        "Option 3", "Option 4"]),
                                                    i.GroupedFilterDataInstance(group_name="Group 3", group_data=["Option 5", "Option 6"])],
                                              selected=["Option 2"]
                                              ),
    )


@router.post("/multi_filter_group", response_model=i.ReturnData)
async def multi_filter_group():
    return i.ReturnData(
        title="Multi Filter Group",
        type=i.InstanceType.GROUP_FILTER,
        group_filter_data=i.GroupedFilterData(
            name="Group Multi Filter",
            multi=True,
            data=[i.GroupedFilterDataInstance(group_name="Group", group_data=["Option 1", "Option 2"]),
                  i.GroupedFilterDataInstance(group_name="Group 2", group_data=[
                      "Option 3", "Option 4"]),
                  i.GroupedFilterDataInstance(group_name="Group 3", group_data=["Option 5", "Option 6"])],
            selected=["Option 1", "Option 4"]
        ))
    # fxFlex: Optional[str] = "20%"


@router.post("/single_filter_global", response_model=i.ReturnData)
async def single_filter():
    s = i.ReturnData(
        title="Simple Filter",
        type=i.InstanceType.SIMPLE_FILTER,
        simple_filter_data=i.SimpleFilterData(
            name="simple_filter_global",
            data=["Test 1", "My 2"],
            selected=['Test 1']),
        flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')
    )

    return s


@router.post("/single_filter_server_global", response_model=i.ReturnData)
async def single_filter(req: Request):
    t = await req.json()
    if t.get("simple_filter_global") is None:
        s = i.ReturnData(
            title="Simple Filter Server side",
            type=i.InstanceType.SIMPLE_SERVER_FILTER,
            simple_server_filter_data=i.SimpleServerSideFilterData(
                name="simple_filter_server_global",
                data=["Test 1", "My 2"],
                url="/backend/filters/my_data_filter",
                selected=["Test 1"]
            ),
            reactive=i.ReactiveData(
                reactive_ids=["simple_filter_global"],
                hidden=True
            ),
            flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')

        )
    elif t.get("simple_filter_global") == "Test 1":
        s = i.ReturnData(
            title="Simple Filter Server side",
            type=i.InstanceType.SIMPLE_SERVER_FILTER,
            simple_server_filter_data=i.SimpleServerSideFilterData(
                name="simple_filter_server_global",
                data=["Test 1", "My 2"],
                url="/backend/filters/my_data_filter",
                selected=["Test 1"]
            ),
            reactive=i.ReactiveData(
                reactive_ids=["simple_filter_global"],
                hidden=True
            ),
            flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')

        )
    else:
        s = i.ReturnData(
            title="Simple Filter Server side",
            type=i.InstanceType.SIMPLE_SERVER_FILTER,
            simple_server_filter_data=i.SimpleServerSideFilterData(
                name="simple_filter_server_global",
                data=["Test 1", "My 2"],
                url="/backend/filters/my_data_filter",
                selected=["Test 1"]
            ),
            reactive=i.ReactiveData(
                reactive_ids=["simple_filter_global"],
                hidden=False
            ),
            flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')

        )

    return s
