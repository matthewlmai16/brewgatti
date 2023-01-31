import './index.css';
import React, { useState } from 'react';


function ServiceHistory({appointments, setAppointments, getAppointments}) {

    const [vinSearch, setVin] = useState('')
    const [updatedStatus, setStatus] = useState(false)

    const handleSearchInput = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleSearch = (event) => {
        if (vinSearch.length !== 0) {
            event.preventDefault();
        }
        const filteredAppointments = appointments.filter((appointment) =>
            appointment.vin.includes(vinSearch)
        );
        setAppointments(filteredAppointments)
        }

    const handleStatusChange = async (id) => {
        const updatedAppointments = appointments.map(appointment => {
            if (appointment.id === id) {
                appointment.finished = !appointment.finished;
            }
            return appointment;
        });
        setAppointments(updatedAppointments);

        const appointment = appointments.find(appointment => appointment.id === id);
        const url = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify({finished: appointment.finished}),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchConfig)
    }


    return (
        <>
        <form onSubmit={handleSearch} className="input-group mb-3 mt-4">
            <input onChange={handleSearchInput} type="search" className="form-control rounded" placeholder="Search by VIN" aria-label="Search" aria-describedby="search-addon" />
            <button type="submit" className="btn btn-outline-primary">search</button>
        </form>
        <h1 className="text-center mb-3 mt-3">Service History</h1>
        <table className="table table-striped">
        <thead>
          <tr className="text-center">
            <th>VIN</th>
            <th>Customer name</th>
            <th>VIP</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {appointments.map(appointment => {
                return (
                  <tr key={appointment.id} className="text-center">
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{  appointment.vip ?
                            <img
                                src={'https://cdn-icons-png.flaticon.com/512/6941/6941697.png'}
                                alt=""
                                width="25px"
                                height="25px"
                            />:''
                        }
                    </td>
                    <td>{ new Date(appointment.date_time).toLocaleDateString("en-US") }</td>
                    <td>{ new Date(appointment.date_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }) }
                    </td>
                    <td>{ appointment.technician_name.technician_name }</td>
                    <td>{ appointment.reason }</td>
                    <td>{ appointment.finished ?
                            <img onClick={() => handleStatusChange(appointment.id)}
                                src={'https://cdn-icons-png.flaticon.com/512/4315/4315445.png'}
                                alt=""
                                width="25px"
                                height="25px"
                            />:
                            <img onClick={() => handleStatusChange(appointment.id)}
                                src={'https://cdn-icons-png.flaticon.com/512/463/463575.png'}
                                alt=""
                                width="25px"
                                height="25px"
                            />
                        }
                    </td>
                  </tr>
                );
              })}
              </tbody>
      </table>
      </>
    )
}
export default ServiceHistory;
