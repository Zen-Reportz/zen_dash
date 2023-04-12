from zen_dash import Zen
from zen_dash.objects import instances as i

prefix = "/backend/input_page/row_four"


class Slider(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/slider"

    @staticmethod
    def url() -> str:
        return f"/slider"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Example",
                        slider_data=i.SliderData(name="slider_example", min=0, max=100, step=10, value=20, tick_interval=30)
                        )


class SliderVertical(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/slider_vertical"

    @staticmethod
    def url() -> str:
        return f"/slider_vertical"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Vertical Example",
                        slider_data=i.SliderData(name="slider_example_vertical", min=0, max=100, step=10, vertical=True))


class SliderInverted(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/slider_inverted"

    @staticmethod
    def url() -> str:
        return f"/slider_inverted"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Inverted Example",
                        slider_data=i.SliderData(name="slider_example_inverted", min=0, max=100, step=10, invert=True))


class SliderVerticalInverted(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/slider_vertical_inverted"

    @staticmethod
    def url() -> str:
        return f"/slider_vertical_inverted"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.SLIDER,
                        title="Slider Vertical Inverted Example",
                        slider_data=i.SliderData(name="slider_example_vertical_inverted", min=0, max=100, step=10, vertical=True, invert=True))

