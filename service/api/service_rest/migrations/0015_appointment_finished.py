# Generated by Django 4.0.3 on 2023-01-24 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0014_remove_appointment_automobile_vin_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]
