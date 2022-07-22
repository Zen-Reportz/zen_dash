from fastapi import APIRouter, Request
from zen_dash import instances as i


router = APIRouter(
    prefix="/backend/filters",
    tags=["filters"],
    responses={404: {"description": "Not found"}},
)

@router.post("/single_filter", response_model=i.ReturnData)
async def single_filter(request: Request):
    s = i.ReturnData(type=i.InstanceType.SIMPLE_FILTER,
                     simple_filter_data=i.SimpleFilterData(
                         name="simple_filter",
                         data=["Option 1","Option 2"])
                     )

    return s


@router.post("/multi_filter", response_model=i.ReturnData)
async def multi_filter(request: Request):
    return i.ReturnData(type=i.InstanceType.SIMPLE_FILTER,
                        simple_filter_data=i.SimpleFilterData(name="Simple Multi Filter",
                                                       multi=True,
                                                       data=["Option 1","Option 2"]))


@router.post("/single_filter_group", response_model=i.ReturnData)
async def single_filter_group(request: Request):
    return i.ReturnData(type=i.InstanceType.GROUP_FILTER,
                        group_filter_data=i.GroupedFilterData(name="Group Simple Filter", 
                            data=[i.GroupedFilterDataInstance(group_name="Group", group_data=["Option 1", "Option 2"]),
                                  i.GroupedFilterDataInstance(group_name="Group 2", group_data=["Option 3", "Option 4"]),
                                  i.GroupedFilterDataInstance(group_name="Group 3", group_data=["Option 5""Option 6"])]))


@router.post("/multi_filter_group", response_model=i.ReturnData)
async def multi_filter_group(request: Request):
    return i.ReturnData(type=i.InstanceType.GROUP_FILTER,
                        group_filter_data=i.GroupedFilterData(
                            name="Group Multi Filter",
                            multi=True,
                            data=[i.GroupedFilterDataInstance(group_name="Group", group_data=["Option 1", "Option 2"]),
                                  i.GroupedFilterDataInstance(group_name="Group 2", group_data=["Option 3", "Option 4"]),
                                  i.GroupedFilterDataInstance(group_name="Group 3", group_data=["Option 5""Option 6"])]))
    # fxFlex: Optional[str] = "20%"