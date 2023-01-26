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
        "id",
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord,
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "sales_price",
        "id",

    ]
    encoders = {
        "automobile": AutoVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

####### Create your views here ########


############ view function to show all the salesperson#######
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
        try:
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Person Does Not Exist"},
                status=404,
            )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid Salesperson Input"},
                status=400,
            )
    else:
        try:
            count, _ = SalesPerson.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Person Does Not Exist"},
                status=404
            )


#########  view function for customer  ##########
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
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404
            )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=Customer,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Invalid Customer Input"},
                status=400
            )
    else:
        count, _ = Customer.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})


########## view function for SalesRecord #############
@require_http_methods(["GET", "POST"])
def api_list_salesrecords(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            automobile_href = content["automobile"]
            automobile = AutoVO.objects.get(import_href=automobile_href)
            if automobile.available is True:
                content["automobile"] = automobile

                salesperson = SalesPerson.objects.get(
                    name=content["salesperson"])
                content["salesperson"] = salesperson

                content["salesperson"] = salesperson

                customer = Customer.objects.get(name=content["customer"])
                content["customer"] = customer

                salesrecord = SalesRecord.objects.create(**content)
        except AutoVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status=400
            )

        return JsonResponse(
            salesrecord,
            encoder=SalesRecordEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesrecord(request, id):
    if request.method == "GET":
        try:
            sales_record = SalesRecord.objects.get(id=id)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Record does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        count, _ = SalesRecord.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            sales_record = SalesRecord.objects.get(id=id)

            automobile_href = content["automobile"]
            automobile = AutoVO.objects.get(import_href=automobile_href)
            content["automobile"] = automobile

            customer_name = content["customer"]
            customer = Customer.objects.get(name=customer_name)
            content["customer"] = customer

            salesperson = content["salesperson"]
            sales_person = SalesPerson.objects.get(name=salesperson)
            content["salesperson"] = sales_person

            properties = ["salesperson", "customer",
                          "automobile", "sales_price"]

            for prop in properties:
                setattr(sales_record, prop, content[prop])
            sales_record.save()
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sales Record Incorrect"},
                status=400,
            )
