from fastapi import APIRouter, Request
from zen_dash import instances as i


router = APIRouter(
    prefix="/backend/filters",
    tags=["filters"],
    responses={404: {"description": "Not found"}},
)

@router.get("/single_filter", response_model=i.ReturnData)
async def single_filter(request: Request):
    s = i.ReturnData(type=i.InstanceType.FILTER,
                     filter_data=i.SimpleFilterData(
                         name="simple_filter",
                         label="Simple Filter",
                         data=["Option 1","Option 2"])
                     )

    return s


@router.get("/multi_filter", response_model=i.ReturnData)
async def multi_filter(request: Request):
    return i.ReturnData(type=i.InstanceType.MULTI_FILTER,
                        filter_data=i.SimpleFilterData(name="simple_multi_filter",
                                                       label="Simple Multi Filter",
                                                       data=["Option 1","Option 2"]))


@router.get("/single_filter_group", response_model=i.ReturnData)
async def single_filter_group(request: Request):
    return i.ReturnData(type=i.InstanceType.FILTER_GROUP,
                        filter_data=i.GroupedFilterData(label="Group Simple Filter",
                                                 name="simple_group_filter", data=[
                                                     i.GroupedFilterDataInstance(group_label="Group", group_data=["Option 1", "Option 2"]),
                                                     i.GroupedFilterDataInstance(group_label="Group 2", group_data=["Option 3", "Option 4"]),
                                                     i.GroupedFilterDataInstance(group_label="Group 3", group_data=["Option 5""Option 6"])]))


@router.get("/multi_filter_group", response_model=i.ReturnData)
async def multi_filter_group(request: Request):
    return i.ReturnData(type=i.InstanceType.MULTI_FILTER_GROUP,
                        filter_data=i.GroupedFilterData(label="Group Simple Filter",
                                                 name="simple_group_filter", data=[
                                                     i.GroupedFilterDataInstance(group_label="Group", group_data=["Option 1", "Option 2"]),
                                                     i.GroupedFilterDataInstance(group_label="Group 2", group_data=["Option 3", "Option 4"]),
                                                     i.GroupedFilterDataInstance(group_label="Group 3", group_data=["Option 5""Option 6"])]))
# fxFlex: Optional[str] = "20%"