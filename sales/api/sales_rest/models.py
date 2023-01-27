from django.db import models

# Create your models here.


class AutoVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    available = models.BooleanField(default=True)
    import_href = models.CharField(max_length=100, unique=True, null=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=50, unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
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
