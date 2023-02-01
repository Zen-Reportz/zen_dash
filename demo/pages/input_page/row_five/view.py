import random

from zen_dash import instances as i
from zen_dash import Zen
import asyncio

prefix = "/backend/input_page/row_five"


class ButtonToggle(Zen):
    @staticmethod
    def full_url(query=None) -> str:
        if query:
            return f"{prefix}/button_toggle?{query}"    
        return f"{prefix}/button_toggle"

    @staticmethod
    def url() -> str:
        return f"/button_toggle"

    @staticmethod
    async def view(query_params):
        await asyncio.sleep(10)
        flex = i.FlexData()
        red = random.choice(['red', 'light_red'])
        if query_params:
            flex = i.FlexData(fxFlex="100%", fxFlex_md="100%")

        t = i.ReturnData(type=i.InstanceType.BUTTON_TOGGLE,
                         title="Button Toggle",
                         button_toggle_data=i.ButtonToggleData(name="single_toggle_data",
                                                               multi=False,
                                                               data=[i.ButtonToggleInstance(label=red, name=red, selected=True),
                                                                     i.ButtonToggleInstance(
                                                                         label="Blue", name="blue"),
                                                                     i.ButtonToggleInstance(label="Black", name="black")]),
                         flex=flex
                         )
        return t


class ButtonToggleMultiple(Zen):
    @staticmethod
    def full_url(query=None) -> str:
        if query:
            return f"{prefix}/button_toggle_multiple?{query}"
        return f"{prefix}/button_toggle_multiple"

    @staticmethod
    def url() -> str:
        return f"/button_toggle_multiple"

    @staticmethod
    async def view(query_params):
        flex = i.FlexData()
        if (query_params):
            flex = i.FlexData(fxFlex="100%", fxFlex_md="100%")

        return i.ReturnData(type=i.InstanceType.BUTTON_TOGGLE,
                            title="Button Toggle multiple",
                            button_toggle_data=i.ButtonToggleData(name="multi_toggle_data",
                                                                  multi=True,
                                                                  data=[i.ButtonToggleInstance(label="Red", name="red", selected=True),
                                                                        i.ButtonToggleInstance(
                                                                      label="Blue", name="blue"),
                                                                      i.ButtonToggleInstance(label="Black", name="black")]),
                            flex=flex
                            )


class Toggle(Zen):
    @staticmethod
    def full_url(query=None) -> str:
        if query:
            return f"{prefix}/toggle?{query}"
        return f"{prefix}/toggle"

    @staticmethod
    def url() -> str:
        return f"/toggle"

    @staticmethod
    async def view(query_params):
        flex = i.FlexData()
        if (query_params):
            flex = i.FlexData(fxFlex="100%", fxFlex_md="100%")
        return i.ReturnData(type=i.InstanceType.TOGGLE,
                            title="Toggle Example",
                            toggle_data=i.ToggleData(
                                name="toggle_data",  checked=True),
                            flex=flex
                            )


class MultiRecords(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_records"

    @staticmethod
    def url() -> str:
        return f"/multi_records"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.MULTI_LIST,
                        title="List Example",
                        multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url=ButtonToggle.full_url("test")),
                                                     i.MultiURLInfo(
                                                         name="button toggle multiple", url=ButtonToggleMultiple.full_url("test")),
                                                     i.MultiURLInfo(name="toggle", url=Toggle.full_url('test'))])
                        )
