import React, { useState } from 'react';

function ManufacturerForm({manufacturers, getManufacturers}) {

    const [name, setManufacturerName] = useState('');
    const [state, setState] = useState(false);
    const [duplicate, setDuplicate] = useState(false);


    const handleNameChange = (event) => {
        const value = event.target.value;
        setManufacturerName(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;

        const technicianUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };


        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {

            setState(true);
            setDuplicate(false);
            setManufacturerName('');
            getManufacturers();
        }
        else {
            setDuplicate(true);
            setState(false);
        }
    }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Manufacturer name" required type="text" name = "name" id="name" className="form-control" value={name}/>
                        <label htmlFor="name">Manufacturer name</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                <p></p>
                {state?
                    <div className="alert alert-success mb-0" id="success-message">
                    Success! You created a manufacturer!
                </div>: <div></div>
                }
                <div>
                {duplicate?
                    <div className="alert alert-danger mb-0" id="success-message">
                    Manufacturer already exists.
                </div>: <div></div>
                }
                </div>
                </div>
            </div>
        </div>
    )
}
export default ManufacturerForm;
