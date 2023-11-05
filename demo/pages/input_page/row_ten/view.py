from zen_dash import Zen
from zen_dash.objects import instances as i
from pages.input_page.row_ten.form import formdata, formSchema, formUISchema

prefix="/backend/input_page/row_ten"

class Form(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/form"

    @staticmethod
    def url() -> str:
        return "/form"

    @staticmethod
    def view():
         return i.ReturnData(type=i.InstanceType.FORM,
                        form_data= i.FormData(
                            name="form_data",
                            submit_info=i.SubmitFormData(name="Save", url=Form.server_full_url()),
                            data=formdata,
                            form_schema=formSchema,
                            ui_schema=formUISchema),
                        flex=i.FlexData(fxFlex='100%', fxFlex_md='100%')
                       )
    @staticmethod
    def server_full_url() -> str:
        return f"{prefix}/save_form"

    @staticmethod
    def server_url() -> str:
        return "/save_form"

    @staticmethod
    def server(data):
        return i.UpdateReturnData(
            type=i.UpdateInstanceType.FORM,
            response_form_data=i.ResponseFormData(redirect_url="http://localhost:4205?working=true")
        )