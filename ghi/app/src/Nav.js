import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manufacturers
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers/list/">List of manufacturers</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new/">Create manufacturer</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Vehicle Models
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/models/list/">List of vehicle models</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/models/new/">Create vehicle model</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Appointments
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/list/">List of appointments</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/new/">Create appointment</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Technicians
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/list/">Our Technicians</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/new/">Create Technician</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/services/history/">Service History</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
