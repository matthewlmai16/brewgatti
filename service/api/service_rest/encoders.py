from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "technician_name",
        "employee_number",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        "date_time",
        "reason",
        "vip",
        "finished",
        "id",
    ]
    encoders = {
        "technician_name": TechnicianListEncoder()
    }
