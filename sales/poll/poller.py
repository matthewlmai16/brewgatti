import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutoVO

def get_Automobile():
    # to get the correct url, please refer to the dockerfile.yaml
    # where do we need to ping? we need to ping our inventory API
    # find that line of code in the yaml folder, follow the correct port
    # and we'll finish the rest of the url with what matches in our
    # inventory url path for the list of automobiles

    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    # this is pulling from the actual inventory model "Automobile" -- NOT our VO object
    for auto in content["autos"]:
        AutoVO.objects.update_or_create(
            import_href=auto["href"],
            # import_href is not a default property of the Automobile model,
            # so we're setting this in line 30, the auto["href"] is created when we create an
            # instance of Automobile
            defaults={
                "color": auto["color"],
                "year": auto["year"],
                "vin": auto["vin"],
            },
        )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_Automobile()
            # Write your polling logic, here

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
