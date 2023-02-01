ChartData = {
    "xAxis": {
        "type": 'category',
        "boundaryGap": False
    },
    "yAxis": {
        "type": 'value',
        "boundaryGap": [0, '30%']
    },
    "visualMap": {
        "type": 'piecewise',
        "show": False,
        "dimension": 0,
        "seriesIndex": 0,
        "pieces": [
            {
                "gt": 1,
                "lt": 3,
                "color": 'rgba(0, 0, 180, 0.4)'
            },
            {
                "gt": 4,
                "lt": 7,
                "color": 'rgba(0, 0, 180, 0.4)'
            }
        ]
    },
    "series": [
        {
            "type": 'line',
            "smooth": 0.6,
            "symbol": 'none',
            "lineStyle": {
                "color": '#5470C6',
                "width": 5
            },
            "markLine": {
                "symbol": ['none', 'none'],
                "label": {"show": False},
                "data": [{"xAxis": 1}, {"xAxis": 3}, {"xAxis": 4}, {"xAxis": 7}]
            },
            "areaStyle": {},
            "data": [
                ['2019-10-10', 200],
                ['2019-10-11', 560],
                ['2019-10-12', 750],
                ['2019-10-13', 580],
                ['2019-10-14', 250],
                ['2019-10-15', 300],
                ['2019-10-16', 450],
                ['2019-10-17', 300],
                ['2019-10-18', 100]
            ]
        }
    ]
}
