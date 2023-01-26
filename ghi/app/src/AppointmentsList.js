import './index.css';
import React, { useState } from 'react';


function AppointmentsList({appointments, getAppointments}) {

    const [success, setSuccess] = useState(false);
    const [cancel, setCancel] = useState(false);

    const cancelAppointment = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/`
        const fetchConfig = {
            method: 'delete',
        };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        setCancel(true);
        setSuccess(false);
        getAppointments();
    }
    else{
      setCancel(false);
      setSuccess(false);
    }
    }

    const completeAppointment = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify({ finished: true }),
            headers: {
                "Content-type": "application/json"
            }
        };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        setSuccess(true);
        setCancel(false);
        getAppointments();
    }
    else{
      setSuccess(false);
      setCancel(false);
    }
    }

    return (
        <>
        <h1 className="mb-3 mt-3">Service Appointments</h1>
        <div>
          <p></p>
            {success?
              <div className="alert alert-success mb-0" id="success-message">
              Success! You completed an appointment!
              </div>: <div></div>
          }
        </div>
        <div>
          <p></p>
            {cancel?
              <div className="alert alert-danger mb-0" id="success-message">
              Cancelled appointment!
              </div>: <div></div>
          }
        </div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            if (appointment.finished === false)
            return (
              <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ appointment.customer_name }</td>
                <td>{ new Date(appointment.date_time).toLocaleDateString("en-US") }</td>
                <td>{ new Date(appointment.date_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }) }
                </td>
                <td>{ appointment.technician_name.technician_name }</td>
                <td>{ appointment.reason }</td>
                <td>
                    <button id={ appointment.id } onClick={() => cancelAppointment(appointment)}
                        type="button" className="btn btn-danger">
                        cancel
                    </button>
                    {"   "}
                    <button id={ appointment.id } onClick={() => completeAppointment(appointment)}
                        type="button" className="btn btn-success">
                        completed
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default AppointmentsList;
