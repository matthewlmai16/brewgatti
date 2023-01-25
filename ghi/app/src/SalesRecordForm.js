import React, {useEffect, useState} from 'react';

function SalesRecordForm() {

  /// set variables and set state

  const [automobiles, setAutomobiles] = useState([]);

  const [salespersons, setSalesPersons] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [sales_price, setSalesPrice] = useState([]);


  const handleAutomobilesChange = (event) => {
    const value = event.target.value;
    setAutomobiles(value);
  }

  const handleSalesPersonsChange = (event) => {
    const value = event.target.value;
    setSalesPersons(value);
  }

  const handleCustomersChange = (event) => {
    const value = event.target.value;
    setCustomers(value);
  }

  const handleSalesPriceChange = (event) => {
    const value = event.target.value;
    setSalesPrice(value);
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

///////// get our list of dropdowns

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

const fetchCustomers = async () => {
  const customerUrl = 'http://localhost:8090/api/customers/';

  const response = await fetch(customerUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    setCustomers(data.customers);
  }
}

const fetchAutomobiles = async () => {
  const automobileUrl = 'http://localhost:8100/api/automobiles/';

  const response = await fetch(automobileUrl);

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    setAutomobiles(data.autos);
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
                    <select value={automobiles} onChange={handleAutomobilesChange} required name="automobiles" className="form-select">
                    <option value="">Choose a Automobile</option>
                    {automobiles.map(automobile => {
                            return (
                                <option key={automobile.import_href} value={automobile.import_href}>
                                {automobile.vin}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={salespersons} onChange={handleSalesPersonsChange} required  name="salespersons" className="form-select">
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
                    <select value={customers} onChange={handleCustomersChange} required name="customer" className="form-select">
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
