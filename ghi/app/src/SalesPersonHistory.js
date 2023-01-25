import React, {useEffect, useState} from 'react';

function SalesPersonHistory() {

  /// set variables and set state
  const [salesperson, setSalesPerson] = useState('');
  const handleSalesPersonChange = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
  }

  const [salespersons, setSalesPersons] = useState([]);
  const handleSalesPersonsChange = (event) => {
    const value = event.target.value;
    setSalesPersons(value);
  }

  const [salesrecords, setSalesRecords] = useState([]);
  const handleSalesRecordsChange = (event) => {
    const value = event.target.value;
    setSalesRecords(value);
  }


  /////////// get our list of salespeople///////

const fetchSalesPersons = async () => {
  const salespersonUrl = 'http://localhost:8090/api/salesperson/';

  const response = await fetch(salespersonUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    /// look in our insomnia, when we get a list of salesperson
    /// it returns an object where the key is sales_staff and the
    /// value is a list of sales_staff
    setSalesPersons(data.sales_staff);
  }
}

const fetchSalesRecords = async () => {
  const salesrecordUrl = 'http://localhost:8090/api/salesrecords/'

  const response = await fetch(salesrecordUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    setSalesRecords(data.sales);
  }

}


////////////////// useEffect //////

useEffect(() => {
  fetchSalesPersons();
  fetchSalesRecords();
}, []);


  /////////// our jsx form //////////////

  return (
    <>
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Select a Salesperson!</h1>
            <div className="mb-3">
                    <select value={salesperson} onChange={handleSalesPersonChange} required  name="salesperson" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {salespersons.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.name}>
                                    {salesperson.name}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Sales Person</th>
                          <th>Customer</th>
                          <th>VIN</th>
                          <th>Sales Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* we want salesrecords.salesperson.name to equal value in line 68 */}
                        {salesrecords.filter(salesrecord => salesrecord.salesperson.name === salesperson)
                        .map(salesrecord => {
                          return (
                            <tr key={salesrecord.id}>
                                <td>{salesrecord.salesperson.name}</td>
                                <td>{salesrecord.customer.name}</td>
                                <td>{salesrecord.automobile.vin}</td>
                                <td>${salesrecord.sales_price}</td>

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


export default SalesPersonHistory;
