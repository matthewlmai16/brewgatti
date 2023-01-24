from django.urls import path
from .views import api_list_salesperson, api_show_salesperson

urlpatterns = [
    path("salesperson/", api_list_salesperson, name="api_list_salesperson"),
    path("salesperson/<int:id>/", api_show_salesperson,
         name="api_show_salesperson")
]
