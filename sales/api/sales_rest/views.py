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
        "available",
        "import_href"
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id"
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


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(id=id)
        # need to pass id=id in the argument
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        SalesPerson.objects.filter(id=id).update(**content)
        sales_person = SalesPerson.objects.get(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    else:
        count, _ = SalesPerson.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})


#########    view function for customer  ##########
@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    # if request.method == "POST"
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        # need to pass id=id in the argument
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=Customer,
            safe=False,
        )
    else:
        count, _ = Customer.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
