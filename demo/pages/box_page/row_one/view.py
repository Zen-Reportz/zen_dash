import asyncio

from pydantic import BaseModel
from pages.chart_page.row_eight.view import HighchartStock
from zen_dash.objects import instances as i
from zen_dash import page as p
from zen_dash import Zen
from uuid import uuid4
from random import randint

prefix = "/backend/box_page/row_one"


class BoxInput(BaseModel):
    page: str

class FirstBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/first_box"

    @staticmethod
    def url() -> str:
        return "/first_box"

    @staticmethod
    async def view(b: BoxInput):
        r = uuid4()
        r1 = randint(20, 30)
        await asyncio.sleep(r1)
        dialog_data = i.DialogBox(
            url=FirstBoxDialog.full_url(), height="70%", width="70%")
        
        import random
        name = random.choice(["Users", "Spent", "Duration"])
        Value = random.choice(["5009", "200", "50", "20"])
        return i.ReturnData(type=i.InstanceType.BOX,
                            box_data=i.BoxData(
                                icon="person",
                                name=name,
                                value=Value),
                            footer="5% increase compare to last week ",
                            tooltip_data=i.ToolTipData(
                                label="my label", disable=False),
                            dialog_data=dialog_data,
                            ui_data=[i.UIData(
                                type=i.UIType.LOCALSTORAGE,
                                action=i.UIAction.ADD,
                                value="sdasd",
                                key="my_key"), i.UIData(
                                type=i.UIType.SESSION,
                                action=i.UIAction.ADD,
                                value="123213",
                                key="my_key")]
                            )


class FirstBoxDialog(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/first_box_dialog"

    @staticmethod
    def url() -> str:
        return '/first_box_dialog'

    @staticmethod
    async def view(b: BoxInput):
        return p.Page(
            rows=[
                p.Row(data=[
                    p.Instance(url=HighchartStock.full_url())])])


class SecondBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/second_box"

    @staticmethod
    def url() -> str:
        return "/second_box"

    @staticmethod
    async def view(b:BoxInput):
        return i.ReturnData(type=i.InstanceType.BOX,
                            box_data=i.BoxData(
                                icon="percent", name="User Spent", value="$5000"),
                            footer="10% increase compare to last week ")


class ThirdBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/third_box"

    @staticmethod
    def url() -> str:
        return "/third_box"

    @staticmethod
    async def view(b:BoxInput):
        return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent (last hour)", value="$400"))


class ForthBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/forth_box"

    @staticmethod
    def url() -> str:
        return '/forth_box'

    @staticmethod
    async def view(b: BoxInput):
        return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent Total", value="$2000"))
