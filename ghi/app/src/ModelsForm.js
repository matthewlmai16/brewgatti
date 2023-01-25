import React, { useEffect, useState } from 'react';

function ModelsForm({manufacturers, getModels}) {
    const [name, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');


    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const appointmentUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment)

            setModelName('');
            setPictureUrl('');
            setManufacturer('');

            getModels();
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new vehicle model</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleModelNameChange} placeholder="Model name" required type="text" name = "name" id="name" className="form-control" value={name}/>
                        <label htmlFor="name">Model name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePictureUrlChange} placeholder="Picture url" required type="text" name = "picture_url" id="picture_url" className="form-control" value={pictureUrl}/>
                        <label htmlFor="customer_name">Picture url</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleManufacturerChange} required id="manufacturer_id" name = "manufacturer_id" className="form-select" value={manufacturer}>
                            <option>Choose a manufacturer</option>
                            {manufacturers.map(manufacturer => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default ModelsForm;
