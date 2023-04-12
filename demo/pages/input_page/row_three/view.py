from zen_dash import Zen
from zen_dash.objects import instances as i

prefix = "/backend/input_page/row_three"


class CheckBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/checkbox"

    @staticmethod
    def url() -> str:
        return "/checkbox"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.CHECKBOX,
                            title="CheckBox Example",
                            checkbox_data=i.CheckBoxData(data=[i.CheckBoxInstance(name="Option 1", selected=False),
                                                               i.CheckBoxInstance(
                                                               name="Option 2", selected=False),
                                                               i.CheckBoxInstance(name="Option 3", selected=False)],
                                                         style=i.Style.horizontal,
                                                         name="check_box_example")

                            )


class CheckBoxVertical(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/checkbox_vertical"

    @staticmethod
    def url() -> str:
        return "/checkbox_vertical"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.CHECKBOX,
                            title="CheckBox Vertical Example",
                            checkbox_data=i.CheckBoxData(data=[i.CheckBoxInstance(name="Option 1", selected=True),
                                                               i.CheckBoxInstance(
                                                                   name="Option 2", selected=False),
                                                               i.CheckBoxInstance(name="Option 3", selected=False)],
                                                         style=i.Style.vertical,
                                                         name="check_box_example_1"))


class RadioBox(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/radiobox"

    @staticmethod
    def url() -> str:
        return "/radiobox"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.RADIO,
                            title="Radio Example",
                            radio_data=i.RadioData(data=["Option 1", "Option 2", "Option 3"],
                                                   style=i.Style.horizontal,
                                                   name="radio_example_1"),
                            flex=i.FlexData(fxFlex="25%"))

class RadioBoxVertical(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/radiobox_vertical"

    @staticmethod
    def url() -> str:
        return "/radiobox_vertical"
    
    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.RADIO,
                        title="Radio Example Vertical",
                        radio_data=i.RadioData(data=["Option 1", "Option 2", "Option 3"],
                                               style=i.Style.vertical,
                                               name="radio_example_2",
                                               selected="Option 1"))

