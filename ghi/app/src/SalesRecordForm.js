import React, {useEffect, useState} from 'react';

function SalesRecordForm() {

  const [automobile, setAutomobile] = useState('');

  const [salesperson, setSalesPerson] = useState('');

  const [customer, setCustomer] = useState('');

  const [sales_price, setSalesPrice] = useState('');


  const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  }

  const handleSalesPersonChange = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
  }

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  }


  const handleSalesPriceChange = (event) => {
    const value = event.target.value;
    setSalesPrice(value);
  }


  /// set variables and set state for array



  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;
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
      console.log(response)

      const data = await response.json();

      setAutomobile('');
      setCustomer('');
      setSalesPerson('');
      setSalesPrice('');
    }




  }






///////// get our list of dropdowns


const [automobiles, setAutomobiles] = useState([]);

const [salespersons, setSalesPersons] = useState([]);

const [customers, setCustomers] = useState([]);


const fetchAutomobiles = async () => {
  const automobileUrl = 'http://localhost:8090/api/automobiles/';

  const response = await fetch(automobileUrl);

  if (response.ok) {
    const data = await response.json();


    setAutomobiles(data.autos);
  }
}


const fetchSalesPersons = async () => {
  const salespersonUrl = 'http://localhost:8090/api/salesperson/';

  const response = await fetch(salespersonUrl);

  if (response.ok) {
    const data = await response.json();
    setSalesPersons(data.sales_staff);
  }
}

const fetchCustomers = async () => {
  const customerUrl = 'http://localhost:8090/api/customers/';

  const response = await fetch(customerUrl);

  if (response.ok) {
    const data = await response.json();


    setCustomers(data.customers);
  }
}




////////////////// useEffect //////

useEffect(() => {
    fetchSalesPersons();
    fetchAutomobiles();
    fetchCustomers();
}, []);

  /////////// our jsx form //////////////

  return (
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a sales record</h1>
            <form onSubmit={handleSubmit} id="create-sales-record-form">
                <div className="mb-3">
                    <select value={automobile} onChange={handleAutomobileChange} required name="automobile" className="form-select">
                    <option value="">Choose a Automobile</option>
                    {automobiles.map(automobile => {
                            return (
                                <option key={automobile.vin} value={automobile.import_href}>
                                {automobile.vin}
                                </option>
                            );
                        })}
                    </select>
                </div>
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
                </div>
                <div className="mb-3">
                    <select value={customer} onChange={handleCustomerChange} required name="customer" className="form-select">
                    <option value="">Choose a Customer</option>
                    {customers.map(customer => {
                            return (
                                <option key={customer.id} value={customer.name}>
                                    {customer.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={sales_price} onChange={handleSalesPriceChange} placeholder="Sales Price" required type="text" name="sales_price" id="price" className="form-control"/>
                    <label htmlFor="sales_price">Sales Price (Enter with $)</label>
                </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
    </div>
</div>
);
}

export default SalesRecordForm;
