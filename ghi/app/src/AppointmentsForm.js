import React, { useEffect, useState } from 'react';

function AppointmentsForm({getAppointments}) {
    const [technicians, setTechnicians] = useState([]);

    const [vin, setVin] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');


    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerNameChange = (event) => {
        const value = event.target.value;
        setCustomerName(value);
    }
    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.vin = vin;
        data.customer_name = customerName;
        data.date_time = dateTime;
        data.reason = reason;
        data.technician_name = technician;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment)

            setVin('');
            setCustomerName('');
            setDateTime('');
            setReason('');
            setTechnician('');
            getAppointments();
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} placeholder="VIN" required type="text" name = "vin" id="vin" className="form-control" value={vin}/>
                        <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleCustomerNameChange} placeholder="Fabric" required type="text" name = "customer_name" id="customer_name" className="form-control" value={customerName}/>
                        <label htmlFor="customer_name">Customer name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleDateTimeChange} placeholder="Date & Time" required type="datetime-local" name = "date_time" id="date_time" className="form-control" value={dateTime}/>
                        <label htmlFor="date_time">Date & Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleReasonChange} placeholder="Reason for service" required type="text" name = "reason" id="reason" className="form-control" value={reason}/>
                        <label htmlFor="reason">Reason for service</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleTechnicianChange} required id="technicianName" name = "technician_name" className="form-select" value={technician}>
                            <option>Choose a technician</option>
                            {technicians.map(technician => {
                                return (
                                    <option key={technician.id} value={technician.technician_name}>
                                        {technician.technician_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default AppointmentsForm;
