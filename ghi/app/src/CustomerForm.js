import React, {useEffect, useState} from 'react';

function CustomerForm() {

  /// set variables and set state

  const [name, setName] = useState('');

  const [address, setAddress] = useState('');

  const [phone_number, setPhoneNumber] = useState('');

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  }

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.phone_number = phone_number;
    data.address = address;


    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {

      setName('');
      setAddress('');
      setPhoneNumber('');
    }

  }

  /////////// our jsx form //////////////

  return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new Customer!</h1>
            <form onSubmit={handleSubmit} id="create-html-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Customer Name" required type="text" name = "name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={address} placeholder="Customer Address" required type="text" name = "address"  className="form-control" />
                    <label htmlFor="phone_number">Address </label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePhoneNumberChange} value={phone_number} placeholder="Customer Phone Number" required type="text" name = "phone_number"  className="form-control" />
                    <label htmlFor="phone_number">Phone Number </label>
                </div>

                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
  )
}


export default CustomerForm;
