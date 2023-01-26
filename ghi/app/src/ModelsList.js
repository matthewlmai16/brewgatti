import './index.css';
import React, { useState } from 'react';


function ModelsList({models, getModels}) {
  const [deleted, setDeleted] = useState(false);

  const deleteModel = async (model) => {
        const url = `http://localhost:8100/api/models/${model.id}/`
        const fetchConfig = {
            method: 'delete',
        };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        setDeleted(true);
        getModels();
    }
    else {
      setDeleted(false);
    }
    }

    return (
        <>
        <h1 className="mb-3 mt-3">Vehicle Models</h1>
        <div>
          <p></p>
            {deleted?
                <div className="alert alert-danger mb-0" id="success-message">
                Deleted vehicle model.
            </div>: <div></div>
            }
        </div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Picture</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={model.id}>
                <td>{ model.manufacturer.name }</td>
                <td>{ model.name }</td>
                <td>{
                        <img
                            src={ model.picture_url }
                            className="img-fluid"
                            alt=""
                            width="130px"
                            height="85px"
                        />
                    }
                </td>
                <td>
                    <button id={ model.id } onClick={() => deleteModel(model)}
                        type="button" className="btn btn-danger">
                        delete
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default ModelsList;
