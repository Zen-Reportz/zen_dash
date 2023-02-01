from pages.chart_page.row_eight.view import HighchartStock
from zen_dash import instances as i
from zen_dash import page as p
from zen_dash import Zen
import random

prefix = "/backend/input_page/row_one"


class DateReactive(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/first_box"

    @staticmethod
    def url() -> str:
        return "/first_box"

    @staticmethod
    def view():
        t = [i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"),
                          reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']), flex=i.FlexData(fxFlex='25%', fxFlex_md='50%', fxFlex_sm='100%', fxFlex_xs='100%')),
             i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date Range", name="multi_date", first_date="2020-11-10", second_date="2022-03-24"),
                          reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data'])),
             ]
        return random.choice(t)



class Date(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/date"

    @staticmethod
    def url() -> str:
        return '/date'

    @staticmethod
    def view(single_toggle_data: str):
        if single_toggle_data == 'black':
            return i.ReturnData(type=i.InstanceType.DATE,
                                date_data=i.DateTimeData(
                                    label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"),
                                reactive=i.ReactiveData(hidden=True, reactive_ids=[
                                                        'single_toggle_data'])
                                )

        t = [i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date Range", name="multi_date", first_date="2020-11-24", second_date="2022-11-24"),
                          reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']), flex=i.FlexData(fxFlex='25%', fxFlex_md='50%', fxFlex_sm='100%', fxFlex_xs='100%')),
             i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date Range", name="multi_date", first_date="2020-11-10", second_date="2022-03-24"),
                          reactive=i.ReactiveData(hidden=False, reactive_ids=['single_toggle_data']))]
        return random.choice(t)


class SingleDate(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/single_date"

    @staticmethod
    def url() -> str:
        return "/single_date"

    @staticmethod
    def view():
        d = [i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date", name="single_date", first_date="2020-02-10"),
                          reactive=i.ReactiveData(reactive_ids=['multi_toggle_data'])),
             i.ReturnData(type=i.InstanceType.DATE,
                          date_data=i.DateTimeData(
                              label="Select Date", name="single_date", first_date="2023-03-24"),
                          reactive=i.ReactiveData(reactive_ids=['multi_toggle_data']
                                                  ), flex=i.FlexData(fxFlex='25%', fxFlex_md='50%', fxFlex_sm='100%', fxFlex_xs='100%'))]

        return random.choice(d)
