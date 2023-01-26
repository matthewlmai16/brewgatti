import React, {useEffect, useState} from 'react';

function SalesPersonForm() {

  /// set variables and set state

  const [name, setName] = useState('');

  const [employee_number, setEmployeeNumber] = useState('');

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    setEmployeeNumber(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.employee_number = employee_number;


    const salesPersonUrl = "http://localhost:8090/api/salesperson/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
      const newSalesPerson = await response.json();
      console.log(newSalesPerson)

      setName('');
      setEmployeeNumber('');
    }

  }

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
