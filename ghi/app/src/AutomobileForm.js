import React, { useState , useEffect} from 'react';

function AutomobileForm() {

  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin ] = useState('');
  const [model, setModel] = useState('');
  const [success, setSuccess] = useState(false);



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
      data.model_id = model

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

          setSuccess(true);
          setColor('');
          setYear('');
          setVin('');
          setModel('');
      }
      else{
        setSuccess(false);
      }
  }

  /////////get list of models //////

  const [models, setModels] = useState([]);


  const fetchModels = async () => {
    const modelUrl = 'http://localhost:8100/api/models/';

    const response = await fetch(modelUrl);

    if (response.ok) {
      const data = await response.json();

      setModels(data.models);
    }
  }


////////////////use effect///////
useEffect(() => {
  fetchModels();
}, []);

  /////////jsx///////////////////


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
                  <div className="mb-3">
                    <select value={model} onChange={handleModelChange} required  name="models" className="form-select">
                    <option value="">Choose a Model</option>
                    {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                  <button className="btn btn-primary">Create</button>
              </form>
              <div>
                <p></p>
                    {success?
                    <div className="alert alert-success mb-0" id="success-message">
                    Success! You created an automobile!
                    </div>: <div></div>
                }
                </div>
              </div>
          </div>
      </div>
  )
}
export default AutomobileForm;
