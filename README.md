# CarCar

Team:

* Matthew Mai - Service microservice
* Anthony Pham - Sales Microservice

## Design

Welcome to CarCar - an application that allows a client to manage their car inventory, sales, and services.

CarCar is built using React for the frontend and utilizes microservices for architecture. Each functional area, such as inventory, sales, and service, is handled by a separate microservice - allowing for efficient development and scalability.

The inventory microservice allows for the management of cars in the inventory. Features that include adding, deleting, or updating car information. Through the polling mechanism, the application provides fast communication between the microservices - delivering the client information when neccessary.

The sales microservice tracks and manages car sales, including adding sales, viewing sales records, and management of sales personnel and potential customers.

The service microservice manages the technicians, scheduling of appointments, viewing appointment lists, and displaying the service history.

## CarCar Application Diagram

![CarCar Application Diagram](project-beta-diagram.png)

## Getting Started

Please have Docker Desktop downloaded before continuing with the following directions listed below.

#### Cloning the Repository

1. Inside your terminal, change to a directory that you would like to clone this project into.

2. In your terminal, type: ```git clone https://gitlab.com/matthewlmai/project-beta.git```

3. Switch into the project directory: ```cd project-beta```

#### Firing up Docker

After running the commands above, type and press enter after each command listed below:

1. ```docker volume create beta-data```

2. ```docker-compose build```

3. ```docker-compose up```

<details>
  <summary markdown="span">After successfully following the steps outlined above, you should see all 7 containers running.</summary>

![Successful Docker containers](successful-docker.png)
</details>

## Navigating the Server

To navigate the server, type ```http://localhost:3000``` , this will take you to our Home Page. Within the Home Page is a navigation bar for easy access to each feature that we created. Below is a complete breakdown of the urls for each feature of the application.

## API Outline

### Inventory API

The Inventory API utilizes RESTful methods that allows users to view a list of all manufacturers, create a new manufacturer, view all of the vehicle models, create a new vehicle model, list all of the automobiles, and create new automobiles.

- **List manufacturers** http://localhost:3000/manufacturers/list/
    -  List view of all the manufacturers inside the database
- **Create manufacturer** http://localhost:3000/manufacturers/new/
    - Allows the user to create a new instance of a manufacturer
    - The user inputs a manufacturer name that does not yet exist inside of the database
- **List vehicle models** http://localhost:3000/models/list/
    - List view of all vehicle models in the database
    - Delete a vehicle model instance from the database
- **Create vehicle models** http://localhost:3000/models/new/
    - Allows the user to create a new instance of a vehicle model
    - The user inputs a model name, a picture url of the vehicle, and selects a manufacturer from a dropdown
- **List of automobiles** http://localhost:3000/automobile/list/
    - List view of all automobiles inside of the database
    - Displayed on this list is the VIN, color, year, model, and manufacturer of the vehicle
- **Create an automobile** http://localhost:3000/automobile/new/
    - Allows the user to create a new instance of an automobile
    - The user inputs a color, year, VIN, and selects a model from a dropdown

### Service API

The Service API utilizes RESTful methods that allows users to view a list of appointments that are incomplete (in-progress), create an appointment, a view of all technicians, creating an instance of a technician, and a service history that details all appointment (in-progress and completed)

- **List of appointments** http://localhost:3000/appointments/list/
    -  List view of all appointments that have not yet been completed inside the database
    -  List view of in-progress appointments display the VIN, customer name, date, time, technician, and reason for appointment.
    -  The user also has the ability to cancel or complete an appointment
- **Create an appointment** http://localhost:3000/appointments/new/
    - Allows the user to create a new instance of an appointment
    - The user inputs the VIN, customer name, the date and time of the scheduled appointment, reason for service, and selects a technician from a dropdown
- **List of technicians** http://localhost:3000/technicians/list/
    - List view of all technicians in the database
    - The list view displays the technician name and their respective employee number
- **Create a technician** http://localhost:3000/technicians/new/
    - Allows the user to create a new instance of a technician
    - The user inputs a technician name and an employee number
- **Service history** http://localhost:3000/services/history/
    - List view of a history of all of the service appointments inside of the database (in-progress appointments and completed appointments)
    - The service history has a search feature where a user is able to filter appointments by the VIN. The list view details the VIN, customer name, VIP status, date, time, technician, reason for service, and the current status of the appointment.

### Sales API

The Sales API utilizes RESTful methods that allows users to view a list of all sales, a list view of a salesperson’s sales record history, create a sales record, create an instance of a salesperson, and create new customers.

- **List of sales record** http://localhost:3000/salesrecords/
    -  List view of all sales records in the database
    -  List view of sales record display the sales person, their employee number, their customer, the VIN, and sales price
- **Salesperson history** http://localhost:3000/salesperson/history/
    - The user selects from a dropdown the salesperson they want to see the sales history for
    - This view shows a sales record for a specific salesperson in the database
- **Create a sales record** http://localhost:3000/salesrecords/new/
    - Allows the user to create a new instance of a sales record
    - The user selects an automobile, salesperson, and a customer form a dropdown and inputs the salesprice of the sale
- **Create a new salesperson** http://localhost:3000/salesperson/new/
    - Allows the user to create a new instance of a salesperson
    - The user inputs a salesperson name and their employee number
- **Create a new customer** http://localhost:3000/customer/new/
    - Allows the user to create a new instance of a customer
    - The user inputs the name of the customer, their address, and phone number



## Service microservice

The Service microservice has three models: AutomobileVO, Technician, and Appointment. The AutomobileVO model is a value object which is a representation of the Automobile model in the ***Inventory microservice***. Through the use of a polling mechanism, we are able to poll data from the Automobile model in the Inventory microservice into the AutomobileVO in the Service microservice.

The ```AutomobileVO``` model contains the ```vin``` and ```import_href``` fields. This model is a value object that consistently polls for data from the Automobile model in the Inventory microservice.

The ```Technician``` model contains the ```technician_name``` and ```employee_number``` fields. This model is a source of information that stores data about technicians.

The ```Appointment``` model contains the ```vin```, ```customer_name```, ```date_time```, ```reason```, ```vip```, ```finished```, and ```technician_name``` fields. This model is a source of information that stores data about appointments. The ```vin``` field stores the VIN number of the associated vehicle. The ```vin``` field is not set as a foreign key because clients who do not own a vehicle from the inventory should also be able to make an appointment for services. The ```technician_name``` field is a foreign key to the ```Technician``` model - many appointments can have a single technician. The ```vip``` and ```finished``` fields are used to check for their status.

**Service Microservice RESTful API calls:**
| Action  | Method   | URL   |
|:---:|:---:|:---:|
| List of technicians| GET  | http://localhost:8080/api/technicians/  |
| Create new technicians  | POST  |  http://localhost:8080/api/technicians/  |

<details>
  <summary markdown="span">GET: List of technicians</summary>
Returns:

```
{
    "technicians": [
        {
            "technician_name": "Joshua Elder",
            "employee_number": 111222,
            "id": 1
        },
    ]
}
```

</details>

<details>
  <summary markdown="span">POST: Creating a new technician request</summary>
JSON body request:

```
{
	"technician_name": "Joshua Elder",
	"employee_number": "111222"
}
```

Returns:

```
{
	"technician_name": "Joshua Elder",
	"employee_number": "111222,"
	"id": 1
}
```
</details>

| Action  | Method   | URL   |
|:---:|:---:|:---:|
| List of appointments  | GET   | http://localhost:8080/api/appointments/ |
| Create new appointments | POST | http://localhost:8080/api/appointments/   |
| Show appointment details  | GET  | http://localhost:8080/api/appointments/:id/  |
| Edit a specific appointment | PUT  | http://localhost:8080/api/appointments/:id/ |
| Delete a specific appointment | DELETE  | http://localhost:8080/api/appointments/:id/ |

<details>
  <summary markdown="span">GET: List of appointments</summary>
Returns:

```
{
    "appointments": [
        {
            "vin": "1E3EC5FB2AN120176",
            "customer_name": "John Doe",
            "date_time": "2023-01-24T09:21:32.096450+00:00",
            "reason": "Tire replacement for left/right rear tires",
            "vip": true,
            "finished": false,
            "technician_name": {
                "technician_name": "Joshua Elder",
                "employee_number": 111222,
                "id": 1
            },
            "id": 1
        },
    ]
}
```
</details>

<details>
  <summary markdown="span">POST: Creating a new appointment request</summary>
JSON body request:

```
{
    "vin": "1C3CC5FB2AN120174",
    "customer_name": "John Doe",
    "date_time": "2023-01-24T09:21:32.096450+00:00",
    "reason": "Tire replacement for left/right rear tires",
    "technician_name": "Joshua Elder"
}
```

Returns:

```
{
	"vin": "1C3CC5FB2AN120174",
	"customer_name": "John Doe",
	"date_time": "2023-01-24T09:21:32.096450+00:00",
	"reason": "Tire replacement for left/right rear tires",
	"vip": true,
	"finished": false,
	"technician_name": {
		"technician_name": "Joshua Elder",
		"employee_number": 111222,
		"id": 1
	},
	"id": 1
}
```
</details>

<details>
  <summary markdown="span">GET: Show a specific appointment</summary>
Returns:

```
{
	"vin": "1C3CC5FB2AN120174",
	"customer_name": "John Doe",
	"date_time": "2023-01-24T09:21:32.096450+00:00",
	"reason": "Tire replacement for left/right rear tires",
	"vip": true,
	"finished": false,
	"technician_name": {
		"technician_name": "Joshua Elder",
		"employee_number": 111222,
		"id": 1
	},
	"id": 1
}
```
</details>

</details>

<details>
  <summary markdown="span">PUT: Edit a specific appointment</summary>
JSON body request:

```
{
    "vin": "1C3CC5FB2AN120174",
    "customer_name": "John Doe",
    "date_time": "2023-01-24T09:21:32.096450+00:00",
    "reason": "Tire replacement for all tires",
    "technician_name": "Joshua Elder"
}
```

Returns:
```
{
	"vin": "1C3CC5FB2AN120174",
	"customer_name": "John Doe",
	"date_time": "2023-01-24T09:21:32.096450+00:00",
	"reason": "Tire replacement for all tires",
	"vip": true,
	"finished": false,
	"technician_name": {
		"technician_name": "Joshua Elder",
		"employee_number": 111222,
		"id": 1
	},
	"id": 1
}
```
</details>

<details>
  <summary markdown="span">DELETE: Delete a specific appointment</summary>
Returns:

```
{
	"deleted": true
}
```
</details>


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
