from django.urls import path
from .views import api_list_technicians, api_list_appointments, api_show_appointments, api_show_appointments_by_vin

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("appointments/<int:pk>/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<str:vin>/", api_show_appointments_by_vin, name="api_show_appointments_by_vin"),

]
