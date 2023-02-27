import asyncio
from pages.chart_page.row_eight.view import HighchartStock
from zen_dash import instances as i
from zen_dash import page as p
from zen_dash import Zen
from zen_dash.encoder import JsonEncoder
import random
import json
import time
from fastapi.websockets import WebSocket

prefix = "/backend/box_page/row_one"


class FirstBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/first_box"

    @staticmethod
    def url() -> str:
        return "/first_box"

    @staticmethod
    def view():
        dialog_data = i.DialogBox(
            url=FirstBoxDialog.full_url(), height="70%", width="70%")

        return i.ReturnData(type=i.InstanceType.BOX,
                            box_data=i.BoxData(
                                icon="person", 
                                name="Users", 
                                value="5000", 
                                websocket_url=FirstBox.websocket_url()
                                ),
                            footer="5% increase compare to last week ",
                            tooltip_data=i.ToolTipData(
                                label="my label", disable=False),
                            dialog_data=dialog_data,
                            )

    @staticmethod
    def websocket_url() -> str:
        return "/backend/websocket/first_box"

    @staticmethod
    async def websocket(websocket: WebSocket):
        await websocket.accept()
        data = None
        while True:
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=1)
            except:
                pass
            value = random.choice(["100", "200", "300", "400"])
            name = random.choice(["Users", "Unique Users", "Volume", "Money"])
            icon = random.choice(["person", "home", "percent"])
            dd = i.ReturnData(type=i.InstanceType.BOX, 
                             box_data=i.BoxData(
                                        icon=icon, 
                                        name=name, 
                                        value=value, 
                                        websocket_url=FirstBox.websocket_url())
                            )
            await websocket.send_text(dd.json())
            time.sleep(10)


class FirstBoxDialog(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/first_box_dialog"

    @staticmethod
    def url() -> str:
        return '/first_box_dialog'

    @staticmethod
    def view():
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
    def view():
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
    def view():
        return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent (last hour)", value="$400"))


class ForthBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/forth_box"

    @staticmethod
    def url() -> str:
        return '/forth_box'

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="attach_money", name="User Spent Total", value="$2000"))
