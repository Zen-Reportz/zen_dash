import warnings

from zen_dash.objects.scripts import *

warnings.warn("""
from zen_dash import scripts is depricated, Please use
from zen_dash.objects import scripts
""", DeprecationWarning)