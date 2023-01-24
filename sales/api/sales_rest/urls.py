from django.urls import path
from .views import api_list_salesperson, api_show_salesperson, api_list_customer, api_show_customer

urlpatterns = [
    path("customers/<int:id>/", api_show_customer, name="api_show_customer"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("salesperson/", api_list_salesperson, name="api_list_salesperson"),
    path("salesperson/<int:id>/", api_show_salesperson,
         name="api_show_salesperson")
]
