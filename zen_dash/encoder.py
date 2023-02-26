import json
from enum import Enum


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        return json.JSONEncoder.default(self, obj)


