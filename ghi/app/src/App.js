import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import AppointmentsList from './AppointmentsList';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import SalesRecordForm from './SalesRecordForm';

import AppointmentsForm from './AppointmentsForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceHistory from './ServiceHistory';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [technicians, setTechnicians] = useState([]);

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

  useEffect(() => {getAppointments(); getTechnicians()}, [setAppointments, setTechnicians]);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments/list/" element={<AppointmentsList appointments={appointments} getAppointments={getAppointments} />} />
          <Route path="salesperson">
            <Route path="new" element={<SalesPersonForm />} />
            <Route path="history" element={<SalesPersonHistory />} />
          </Route>
          <Route path="customer" >
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="salesrecords">
            <Route path="new" element={<SalesRecordForm/>} />
          </Route>
          <Route path="/appointments/new/" element={<AppointmentsForm getAppointments={getAppointments} />} />
          <Route path="/technicians/list/" element={<TechnicianList technicians={technicians} />} />
          <Route path="/technicians/new/" element={<TechnicianForm getTechnicians={getTechnicians} />} />
          <Route path="/service/history/" element={<ServiceHistory appointments={appointments} getAppointments={getAppointments} setAppointments={setAppointments}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
