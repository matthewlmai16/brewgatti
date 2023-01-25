import './index.css';

function ManufacturersList({manufacturers}) {

    return (
        <>
        <h1 className="mb-3 mt-3">Manufacturers</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => {
            return (
              <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default ManufacturersList;
