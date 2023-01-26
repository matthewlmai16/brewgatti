from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import TechnicianListEncoder, AutomobileVOEncoder, AppointmentEncoder
from .models import AutomobileVO, Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else: #POST
        content = json.loads(request.body)
        technicians = Technician.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianListEncoder,
            safe=False,
        )



@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=None):
    if request.method == "GET":
        if vin == None:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments":appointments},
                encoder=AppointmentEncoder
            )
        else: #tester
            try:
                appointments = Appointment.objects.filter(vin=vin)
                return JsonResponse(
                    {"appointments": appointments},
                    encoder=AppointmentEncoder
                )

            except Appointment.DoesNotExist:
                return JsonResponse(
                    {"message": "Appointment does not exist"},
                    status=404,
                )
    else: #POST
        content = json.loads(request.body)
        try:
            technician_name = content["technician_name"]
            technician = Technician.objects.get(technician_name=technician_name)
            content["technician_name"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician name"},
                status=400,
            )

        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True
        else:
            content["vip"] = False

        appointments = Appointment.objects.create(**content)
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointments(request, pk):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointments,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404,
            )

    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404
            )

    else: #PUT
        try:
            content = json.loads(request.body)
            if "appointment" in content:
                appointment = Appointment.objects.get(id=pk)

            Appointment.objects.filter(id=pk).update(**content)
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid appointment update"},
                status=400,
            )


@require_http_methods(["GET"])
def api_show_appointments_by_vin(request, vin):
    if request.method == "GET":
        try:
            appointment_by_vin = Appointment.objects.filter(vin=vin)
            return JsonResponse(
                appointment_by_vin,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404,
            )
