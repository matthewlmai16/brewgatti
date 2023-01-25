import './index.css';

function AppointmentsList({appointments}) {
    return (
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

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
}
export default AppointmentsList;
