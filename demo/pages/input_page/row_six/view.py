from zen_dash import Zen
from zen_dash.objects import instances as i
from pages.input_page.row_five import view as rfv
from zen_dash.objects.flex_data import FlexData

prefix="/backend/input_page/row_six"


class MutiRecordsTabs(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_records_tabs"

    @staticmethod
    def url() -> str:
        return "/multi_records_tabs"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.MULTI_TABS,
                                title="Multi Tabs",
                            multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url=rfv.ButtonToggle.full_url()), 
                                                            i.MultiURLInfo(name="button toggle multiple", url=rfv.ButtonToggleMultiple.full_url()),
                                                            i.MultiURLInfo(name = "toggle", url=rfv.Toggle.full_url())]), flex=FlexData(fxFlex="27%")
                                                            
                            )


class MutiRecordsExpand(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/multi_records_expanded"

    @staticmethod
    def url() -> str:
        return "/multi_records_expanded"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.MULTI_EXPAND,
                                title="Multi Expands",
                            multi_data=i.MultiData(urls=[i.MultiURLInfo(name="button toggle", url=rfv.ButtonToggle.full_url()), 
                                                            i.MultiURLInfo(name="button toggle multiple", url=rfv.ButtonToggleMultiple.full_url()),
                                                            i.MultiURLInfo(name = "toggle", url=rfv.Toggle.full_url())]), flex=FlexData(fxFlex="27%")
                                                            
                            )

                             