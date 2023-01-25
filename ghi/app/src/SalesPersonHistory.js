import React, {useEffect, useState} from 'react';

function SalesPersonHistory() {

  /// set variables and set state

  const [salespersons, setSalesPersons] = useState([]);
  const handleSalesPersonsChange = (event) => {
    const value = event.target.value;
    setSalesPersons(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.automobiles = automobiles;
    data.salespersons = salespersons;
    data.customers = customers;
    data.sales_price = sales_price;


    const salesrecordUrl = "http://localhost:8090/api/salesrecords/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(salesrecordUrl, fetchConfig);
    if (response.ok) {
      const newSalesRecord = await response.json();
      console.log(newSalesRecord)

      setAutomobiles('');
      setCustomers('');
      setSalesPersons('');
      setSalesPrice('');
    }

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


////////////////// useEffect //////

useEffect(() => {
  fetchSalesPersons();
}, []);




  /////////// our jsx form //////////////

  return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new Salesperson!</h1>
            <form onSubmit={handleSubmit} id="create-html-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="salesperson name" required type="text" name = "name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEmployeeNumberChange} value={employee_number} placeholder="model name" required type="text" name = "model_name" id="model_name" className="form-control" />
                    <label htmlFor="employee_number">Employee Number </label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
  )
}


export default SalesPersonForm;
