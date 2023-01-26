import React, { useState } from 'react';

function AutomobileForm() {

  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin ] = useState('');
  const [model, setModel] = useState('');


  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  }

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  }

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  }


  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};

      data.color = color;
      data.year = year;
      data.vin = vin;
      data.model = model

      const automobileUrl = 'http://localhost:8100/api/automobiles/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const response = await fetch(automobileUrl, fetchConfig);
      if (response.ok) {
          const newTechnician = await response.json();
          console.log(newTechnician)

          setColor('');
          setYear('');
          setVin('');
          setModel('');
      }
  }



  return (
      <div className="row">
          <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
              <h1>Create a new Automobile</h1>
              <form onSubmit={handleSubmit} id="create-appointment-form">
                  <div className="form-floating mb-3">
                      <input onChange={handleColorChange} placeholder="Color" required type="text" name = "color" id="color" className="form-control" value={color}/>
                      <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleYearChange} placeholder="Year" required type="text" name = "year" id="year" className="form-control" value={year}/>
                      <label htmlFor="year">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleVinChange} placeholder="VIN" required type="text" name = "vin" id="vin" className="form-control" value={vin}/>
                      <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleModelChange} placeholder="Model" required type="text" name = "model" id="model" className="form-control" value={model}/>
                      <label htmlFor="color">Model</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
              </form>
              </div>
          </div>
      </div>
  )
}
export default AutomobileForm;
