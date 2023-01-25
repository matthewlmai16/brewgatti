import React, {useEffect, useState} from 'react';

function SalesRecordForm(props) {

  /// set variables and set state

  const [automobile, setAutomobile] = useState([]);

  const [salesperson, setSalesPerson] = useState([]);

  const [customer, setCustomer] = useState([]);

  const [sales_price, setSalesPrice] = useState([]);


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
      const newSalesRecord = await response.json();
      console.log(newSalesRecord)

      setAutomobile('');
      setCustomer('');
      setSalesPerson('');
      setSalesPrice('');
    }

  }

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
                    {props.automobiles.map(automobile => {
                            return (
                                <option key={automobile.import_href} value={automobile.import_href}>
                                {automobile.vin}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={salesperson} onChange={handleSalesPersonChange} required  name="salesperson" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {props.salesperson.map(salesperson => {
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
                    {props.customers.map(customer => {
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
                    <label htmlFor="sales_price">Sales Price</label>
                </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
    </div>
</div>
);
}

export default SalesRecordForm;
