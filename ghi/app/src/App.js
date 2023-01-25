import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import AppointmentsList from './AppointmentsList';

function App() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const appointments = data.appointments;
      setAppointments(appointments);
    }
  }

  useEffect(() => {getAppointments()}, [setAppointments]);
  console.log(appointments)

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments/list/" element={<AppointmentsList appointments={appointments} getAppointments={getAppointments} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
