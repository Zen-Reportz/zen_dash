from pages.chart_page.row_eight.highchart_data import HighChart2Config, HighChartConfig, HighChartStockConfig
from zen_dash import Zen
from fastapi.responses import FileResponse

from zen_dash.objects import instances as i

prefix = "/backend/chart_page/row_eight"


class Image(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/image"

    @staticmethod
    def url() -> str:
        return f"/image"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.IMAGE,
                            image_data=i.ImageData(url=File.full_url(), height="500px", width="500px"), flex=i.FlexData(fxFlex="50%", fxFlex_md="100%", fxFlex_sm="100%")
                            )


class File(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/show_image"

    @staticmethod
    def url() -> str:
        return f"/show_image"

    @staticmethod
    def view():
        file_path = "files/AuroraPillars_Correia_960.jpg"
        return FileResponse(path=file_path, filename=file_path)


class Highchart(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/highchart"

    @staticmethod
    def url() -> str:
        return f"/highchart"

    @staticmethod
    def view():
        return i.ReturnData(
            type=i.InstanceType.HIGHCHART,
            highchart_data=i.HighChartData(config=HighChartConfig), flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
        )


class Highchart2(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/highchart2"

    @staticmethod
    def url() -> str:
        return f"/highchart2"

    @staticmethod
    def view():
        return i.ReturnData(
            type=i.InstanceType.HIGHCHART,
            highchart_data=i.HighChartData(config=HighChart2Config), flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
        )



class HighchartStock(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/highchart_stock"

    @staticmethod
    def url() -> str:
        return f"/highchart_stock"

    @staticmethod
    def view():
        return i.ReturnData(
        type=i.InstanceType.HIGHCHART,
        highchart_data=i.HighChartData(
            type=i.HighChartType.STOCK,
            config=HighChartStockConfig
        ), flex=i.FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="100%", fxFlex_xs="100%")
    )


