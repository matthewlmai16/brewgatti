from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
from .models import AutoVO, SalesPerson, Customer, SalesRecord


# modelencoders are here

class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = [
        "color",
        "year",
        "vin",
        "available"
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number"
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord,
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "sales_price",
    ]
    encoders = {
        "automobile": AutoVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

# Create your views here.


# view function to show all the salesperson
@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        sales_staff = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_staff": sales_staff},
            encoder=SalesPersonEncoder,
            safe=False,
        )
    # if request.method == "POST"
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get()
