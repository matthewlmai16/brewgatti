import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import SalesRecordForm from './SalesRecordForm';

import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturersForm';
import ModelsList from './ModelsList';

import AppointmentsForm from './AppointmentsForm';
import AppointmentsList from './AppointmentsList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceHistory from './ServiceHistory';


function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const getManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const manufacturers = data.manufacturers;
      setManufacturers(manufacturers);
    }
  }

  const getModels = async () => {
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const models = data.models;
      setModels(models);
    }
  }

  const getAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const appointments = data.appointments;
      setAppointments(appointments);
    }
  }

  const getTechnicians = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const technicians = data.technicians;
      setTechnicians(technicians);
    }
  }

  useEffect(() => {getManufacturers(); getModels(); getAppointments(); getTechnicians()}, [setManufacturers, setModels, setAppointments, setTechnicians]);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salesperson/new/" element={<SalesPersonForm />} />
          <Route path="/customers/new/" element={<CustomerForm />} />
          <Route path="/salesrecords/new/" element={<SalesRecordForm/>} />

          {/* Routes for manufacturers */}
          <Route path="manufacturers">
            <Route path="list" element={<ManufacturersList  manufacturers={manufacturers} />} />
            <Route path="new" element={<ManufacturerForm getManufacturers={getManufacturers} />} />
          </Route>

          {/* Routes for vehicle models */}
          <Route path="models">
            <Route path="list" element={<ModelsList  models={models} getModels={getModels} />} />
            <Route path="new" element={<ManufacturerForm getManufacturers={getManufacturers} />} />
          </Route>

          {/* Routes for technicians */}
          <Route path="technicians">
            <Route path="list" element={<TechnicianList technicians={technicians} />} />
            <Route path="new" element={<TechnicianForm getTechnicians={getTechnicians} />} />
          </Route>

          {/* Routes for appointments */}
          <Route path="appointments">
            <Route path="list" element={<AppointmentsList appointments={appointments} getAppointments={getAppointments} />} />
            <Route path="new" element={<AppointmentsForm getAppointments={getAppointments} getTechnicians={getTechnicians} />} />
          </Route>

          {/* Route for service history */}
          <Route path="services">
            <Route path="history" element={<ServiceHistory appointments={appointments} getAppointments={getAppointments} setAppointments={setAppointments}/>} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
