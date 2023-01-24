from django.db import models

# Create your models here.

# create the automobile value object model here


class AutoVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    available = models.BooleanField(default=True)
    import_href = models.CharField(max_length=100, unique=True, null=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    # employee number is elected for charfield since it may contain letters
    employee_number = models.CharField(max_length=50)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    # there was a phonenumberfield but we needed to install that
    # with pypi - this may be changed to reflect so in stretch goals
    phone_number = models.CharField(max_length=100)


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutoVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    sales_price = models.CharField(max_length=100)
