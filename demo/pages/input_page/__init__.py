from zen_dash.objects import page as p
from pages.input_page.row_one import view as prov
from pages.input_page.row_three import view as prtv
from pages.input_page.row_four import view as prfv
from pages.input_page.row_five import view as prfiv
from pages.input_page.row_six import view as prsv
from pages.input_page.row_seven import view as porsv
from pages.input_page.row_ten import view as rtv


from filters import view as fv
from zen_dash.objects.flex_data import FlexData
from zen_dash import ZenPage
from pages.box_page.row_one import view as rev

inputPage = p.Page(
    rows=[
        p.Row(data=[
            p.Instance(url=rev.FirstBox.full_url()),
            p.Instance(url=prov.Date.full_url()),
            p.Instance(url=prov.SingleDate.full_url()),
            p.Instance(url=prov.DateReactive.full_url())
        ]),
        p.Row(data=[
            p.Instance(url=prtv.CheckBox.full_url()),
            p.Instance(url=prtv.CheckBoxVertical.full_url()),
            p.Instance(url=prtv.RadioBox.full_url()),
            p.Instance(url=prtv.RadioBoxVertical.full_url()),
        ]),
        p.Row(data=[
            p.Instance(url=prfv.Slider.full_url()),
            p.Instance(url=prfv.SliderInverted.full_url()),
            p.Instance(url=prfv.SliderVertical.full_url()),
            p.Instance(url=prfv.SliderVerticalInverted.full_url())
        ]),
        p.Row(data=[
            p.Instance(url=prfiv.ButtonToggle.full_url()),
            p.Instance(url=prfiv.ButtonToggleMultiple.full_url()),
            p.Instance(url=prfiv.Toggle.full_url()),
            p.Instance(url=prfiv.MultiRecords.full_url())
        ]),
        p.Row(data=[
            p.Instance(url=prfiv.MultiRecords.full_url()),
            p.Instance(url=prsv.MutiRecordsTabs.full_url()),
            p.Instance(url=prsv.MutiRecordsExpand.full_url()),

        ]),
        p.Row(data=[
            p.Instance(url=fv.SingleFilter.full_url()),
            p.Instance(url=fv.MultiFilter.full_url()),
            p.Instance(url=fv.SingleFilterGroup.full_url()),
            p.Instance(url=fv.MultiFilterGroup.full_url()),
            p.Instance(url=porsv.Input.full_url()),

        ]),
        p.Row(data=[
            p.Instance(url=fv.SingleFilterServer.full_url()),
            p.Instance(url=fv.MultiFilterServer.full_url()),
        ]),
        p.Row(data=[
            p.Instance(
                url=porsv.FileDownload.full_url()),
            p.Instance(url=porsv.UploadData.full_url()),
            p.Instance(url=porsv.Button.full_url()),
            p.Instance(url=porsv.ButtonRedirect.full_url())]),
        p.Row(
            data=[
                p.Instance(url=rtv.Form.full_url()),
            ]
        )

    ],
    floating_button_url=[
        p.FABURL(url=porsv.FloatingButton.full_url())
    ])

INPUTZENPAGE = ZenPage(
    name="Inputs",
    icon="delete",
    page=inputPage,
    tab_number=0)
