import React, {useEffect, useState} from 'react';

function SalesList() {

  const [sales, setSalesChange] = useState([])

  /////////// get our list of sales //////

const fetchAllSales = async () => {
  const salesUrl = 'http://localhost:8090/api/salesrecords/';

  const response = await fetch(salesUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    /// look in our insomnia, when we get a list of salesperson
    /// it returns an object where the key is sales_staff and the
    /// value is a list of sales_staff
    setSalesChange(data.sales);
  }
}


////////////////// useEffect //////

useEffect(() => {
  fetchAllSales();
}, []);


  /////////// our jsx form //////////////

  return (
    <>
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>All Sales</h1>
            <div className="mb-3">
                    <div>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Sales Person</th>
                          <th>Employee Number</th>
                          <th>Customer</th>
                          <th>VIN</th>
                          <th>Sales Price</th>
                        </tr>
                      </thead>
                      <tbody>
                      {sales.map(salesrecord => {
                          return (
                            <tr key={salesrecord.id}>
                                <td>{salesrecord.salesperson.name}</td>
                                <td>{salesrecord.salesperson.employee_number}</td>
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


export default SalesList;
