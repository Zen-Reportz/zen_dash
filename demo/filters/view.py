from time import sleep
from fastapi import APIRouter, Request
from zen_dash.objects import instances as i
from zen_dash import Zen
import random
import string
prefix = "/backend/filters"


class SingleFilter(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_filter"

    @staticmethod
    def url() -> str:
        return f"/single_filter"

    @staticmethod
    def view():
        s = i.ReturnData(
            title="Simple Filter",
            type=i.InstanceType.SIMPLE_FILTER,
            simple_filter_data=i.SimpleFilterData(
                name="simple_filter",
                data=["Test 1", "My 2"],
                selected=['Test 1'])
        )

        return s


class SingleFilterServer(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_filter_server"

    @staticmethod
    def url() -> str:
        return f"/single_filter_server"

    @staticmethod
    def view():
        s = i.ReturnData(
            title="Simple Filter Server side",
            type=i.InstanceType.SIMPLE_SERVER_FILTER,
            simple_server_filter_data=i.SimpleServerSideFilterData(
                name="simple_filter_server",
                data=["Test 1", "My 2"],
                url=SingleFilterServer.server_full_url(),
                selected=["Test 1"]
            )
        )

        return s

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/my_data_filter"

    @staticmethod
    def server_url() -> str:
        return '/my_data_filter'

    @staticmethod
    def server():
        s = i.UpdateReturnData(type=i.UpdateInstanceType.SIMPLE_FILTER,
                               simple_fitler_data=[''.join(random.choices(
                                   string.ascii_uppercase + string.digits, k=10)) for _ in range(20)]
                               )
        return s


class MultiFilter(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_filter"

    @staticmethod
    def url() -> str:
        return f"/multi_filter"

    @staticmethod
    def view():
        return i.ReturnData(
            title="Multi Filter",
            type=i.InstanceType.SIMPLE_FILTER,
            simple_filter_data=i.SimpleFilterData(name="Simple Multi Filter",
                                                  multi=True,
                                                  data=["Option 1",
                                                        "Option 2"],
                                                  selected=['Option 2', "Option 1"]))


class MultiFilterServer(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_filter_server"

    @staticmethod
    def url() -> str:
        return f"/multi_filter_server"

    @staticmethod
    def view():
        return i.ReturnData(
            title="Multi Filter Server",
            type=i.InstanceType.SIMPLE_SERVER_FILTER,
            simple_server_filter_data=i.SimpleServerSideFilterData(name="Simple Multi server filter",
                                                                   multi=True,
                                                                   data=[
                                                                       "Option 1", "Option 2"],
                                                                   url=MultiFilterServer.server_full_url(),
                                                                   selected=["Option 1", "Option 2"]))

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/multi_my_data_filter"

    @staticmethod
    def server_url() -> str:
        return '/multi_my_data_filter'

    @staticmethod
    def server():
        s = i.UpdateReturnData(type=i.UpdateInstanceType.SIMPLE_FILTER,
                               simple_fitler_data=[''.join(random.choices(
                                   string.ascii_uppercase + string.digits, k=10)) for _ in range(20)]
                               )
        return s


class SingleFilterGroup(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_filter_group"

    @staticmethod
    def url() -> str:
        return f"/single_filter_group"

    @staticmethod
    def view():
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

class MultiFilterGroup(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_filter_group"

    @staticmethod
    def url() -> str:
        return f"/multi_filter_group"

    @staticmethod
    def view():
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

class SingleFilterGlobal(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_filter_global"

    @staticmethod
    def url() -> str:
        return f"/single_filter_global"

    @staticmethod
    def view():
        return i.ReturnData(
        title="Simple Filter",
        type=i.InstanceType.SIMPLE_FILTER,
        simple_filter_data=i.SimpleFilterData(
            name="simple_filter_global",
            data=["Test 1", "My 2"],
            selected=['Test 1']),
        flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')
        )

class SingleFilterServerGlobal(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_filter_server_global"

    @staticmethod
    def url() -> str:
        return f"/single_filter_server_global"

    @staticmethod
    def view(simple_filter_global):
        if simple_filter_global is None:
            s = i.ReturnData(
                title="Simple Filter Server side",
                type=i.InstanceType.SIMPLE_SERVER_FILTER,
                simple_server_filter_data=i.SimpleServerSideFilterData(
                    name="simple_filter_server_global",
                    data=["Test 11", "My 22"],
                    url=SingleFilterServer.server_full_url(),
                    selected=["Test 11"]
                ),
                reactive=i.ReactiveData(
                    reactive_ids=["simple_filter_global"],
                    hidden=True
                ),
                flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')

            )
        elif simple_filter_global == "Test 1":
            s = i.ReturnData(
                title="Simple Filter Server side",
                type=i.InstanceType.SIMPLE_SERVER_FILTER,
                simple_server_filter_data=i.SimpleServerSideFilterData(
                    name="simple_filter_server_global",
                    data=["Test 11", "My 22"],
                    url=SingleFilterServer.server_full_url(),
                    selected=["Test 11"]
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
                    data=["Test 11", "My 22"],
                    url=SingleFilterServer.server_full_url(),
                    selected=["Test 11"]
                ),
                reactive=i.ReactiveData(
                    reactive_ids=["simple_filter_global"],
                    hidden=False
                ),
                flex=i.FlexData(fxFlex='100%', fxFlex_md='100%', fxFlex_sm='100%')

            )

        return s