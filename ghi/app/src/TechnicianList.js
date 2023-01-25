import './index.css';

function TechnicianList({technicians}) {

    return (
        <>
        <h1 className="mb-3 mt-3">Registered Technicians</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Technician</th>
            <th>Employee Number</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
              <tr key={technician.id}>
                <td>{ technician.technician_name }</td>
                <td>{ technician.employee_number }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default TechnicianList;
