import React, { useState , useEffect } from 'react';

function AutomobileList() {

  const [automobiles, setAutomobiles] = useState([])

  const fetchAutomobiles = async () => {
    const automobileUrl = "http://localhost:8100/api/automobiles/"
    const response = await fetch(automobileUrl);

    if (response.ok) {
      const data = await response.json();

      setAutomobiles(data.autos)
    }
  }

///////// useEffect ///////
useEffect(() => {
    fetchAutomobiles();
  }, []);


//////jsx///////////
return (
  <>
  <div className="row">
      <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
          <h1>Automobiles</h1>
          <div className="mb-3">
                  <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* we want salesrecords.salesperson.name to equal value in line 68 */}
                      {automobiles.map(automobile => {
                        return (
                          <tr key={automobile.id}>
                              <td>{automobile.vin}</td>
                              <td>{automobile.color}</td>
                              <td>{automobile.year}</td>
                              <td>{automobile.model.name}</td>
                              <td>{automobile.model.manufacturer.name}</td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </>
)
}


export default AutomobileList;
