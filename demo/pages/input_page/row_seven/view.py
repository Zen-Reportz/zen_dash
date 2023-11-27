import time
from typing import List
from fastapi import UploadFile

from fastapi.responses import FileResponse

from zen_dash.objects import instances as i
from zen_dash import Zen
prefix = "/backend/input_page/row_seven"


class Input(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/input"

    @staticmethod
    def url() -> str:
        return "/input"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.INPUT,
                            title="Input",
                            input_data=i.InputData(
                                label="Input Data", name="myInput", value='test')
                            )


class FileDownload(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/file_download"

    @staticmethod
    def url() -> str:
        return "/file_download"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.DOWNLOAD,
                            title="Download Option",
                            download_data=i.DownloadData(
                                url=FileDownload.server_full_url(), name="download", label="Report")
                            )

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/download_data"

    @staticmethod
    def server_url() -> str:
        return "/download_data"

    @staticmethod
    def server():

        time.sleep(2)
        file_path = "files/Home - ZenReportz.pdf"
        from datetime import datetime
        file_name = datetime.now().strftime("%Y%m%d-%H:%M:%S_") + "test.pdf"
        return FileResponse(path=file_path, filename=file_name)


class UploadData(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/upload"

    @staticmethod
    def url() -> str:
        return "/upload"

    @staticmethod
    def view():
        return i.ReturnData(type=i.InstanceType.UPLOAD, title="upload file",
                            upload_data=i.UploadData(
                                url=UploadData.server_full_url(), multi=True, name="download_data")
                            )

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/upload_data"

    @staticmethod
    def server_url() -> str:
        return "/upload_data"

    @staticmethod
    async def server(files: List[UploadFile]) -> str:
        import time
        time.sleep(2)
        t = {"filenames": [file.filename for file in files]}
        for file_ in files:
            dd = file_.filename.split("/")[-1]
            with open(f"files/{dd}", "wb") as f:
                content = await file_.read()  # async read
                f.write(content)  # async write

        return t


class FloatingButton(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/floating_button"

    @staticmethod
    def url() -> str:
        return "/floating_button"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.FLOATING_BUTTON,
                            floating_button_data=i.ButtonFloating(
                                url="https://google.com",
                                name="test",
                                icon="forward",
                                redirect=True,
                                style={"bottom": "16px", "left": "16px"},
                                fab_style=i.FABStyle.FAB,
                                color=i.FABColor.ACCENT,
                                target_attribute=i.TargetAttribute.Blank)
                            )

class Button(Zen):

    @staticmethod
    def full_url() -> str:
        return f"{prefix}/button"

    @staticmethod
    def url() -> str:
        return "/button"

    @staticmethod
    def view():
        return i.ReturnData(
            title="button data",
            type=i.InstanceType.BUTTON,
            button_data=i.ButtonData(
                url=Button.server_full_url(), name="test this"),
            flex=i.FlexData(fxFlex="0%", fxFlex_md="0%")
        )

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/button_result"

    @staticmethod
    def server_url() -> str:
        return "/button_result"

    @staticmethod
    def server() -> str:
        return i.UpdateReturnData(
            title="button data",
            type=i.UpdateInstanceType.BUTTON_RESULT,
            display=i.Display(
                message="my submit",
                status=i.DisplayStatus.SUCCESS,
            ),
            display_dialog=i.DisplayDialog(
                width='200px',
                height="150px",
                custom_message="<H1>Working </H1>"
            )
        )


class ButtonRedirect(Zen):

    @staticmethod
    def full_url() -> str:
        return f"{prefix}/google_button"

    @staticmethod
    def url() -> str:
        return "/google_button"

    @staticmethod
    def view():
        return i.ReturnData(
            title="button data",
            type=i.InstanceType.BUTTON,
            button_data=i.ButtonData(
                url="https://google.com", name="Take me to the Google", redirect=True)
        )



class ButtonRedirectServer(Zen):

    @staticmethod
    def full_url() -> str:
        return f"{prefix}/button_redirect_server"

    @staticmethod
    def url() -> str:
        return "/button_redirect_server"

    @staticmethod
    def view():
        return i.ReturnData(
            title="button Redirect from server",
            type=i.InstanceType.BUTTON,
            button_data=i.ButtonData(
                color=i.ButtonColor.ACCENT,
                url=ButtonRedirectServer.server_full_url(), name="test this"),
            flex=i.FlexData(fxFlex="0%", fxFlex_md="0%")
        )

    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/button_redirect_server_result"

    @staticmethod
    def server_url() -> str:
        return "/button_redirect_server_result"

    @staticmethod
    def server() -> str:
        return i.UpdateReturnData(
            title="button data",
            type=i.UpdateInstanceType.BUTTON_RESULT,
            button_data=i.ButtonData(
                url="https://google.com", name="Take me to the Google", redirect=True

            ),
            display=i.Display(
                message="my submit",
                status=i.DisplayStatus.SUCCESS,
            ),
            display_dialog=i.DisplayDialog(
                width='200px',
                height="150px",
                custom_message="<H1>Working </H1>"
            )
        )
