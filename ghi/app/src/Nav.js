import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#493832"}}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Brewgatti</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventory
                </a>
                <ul className="dropdown-menu text-white" style={{backgroundColor: "#3D2E29"}} aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/manufacturers/list/">List of manufacturers</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/models/list/">List of vehicle models</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/automobile/list/">List of automobiles</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/manufacturers/new/">Create manufacturer</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/models/new/">Create vehicle model</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/automobile/new/">Create automobiles</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales
                </a>
                <ul className="dropdown-menu" style={{backgroundColor: "#3D2E29"}} aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/salesrecords/">Sales Record</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/salesperson/history/">Sales person History</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/salesrecords/new/">Create sales record</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/salesperson/new/">Create a sales person</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/customer/new/">Create a new customer</NavLink></li>
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
                <ul className="dropdown-menu" style={{backgroundColor: "#3D2E29"}} aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/appointments/list/">List of appointments</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/appointments/new/">Create appointment</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/services/history/">Service History</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Employees
                </a>
                <ul className="dropdown-menu" style={{backgroundColor: "#3D2E29"}} aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/technicians/list/">Meet our Technicians</NavLink></li>
                  <li><NavLink className="dropdown-item text-white" aria-current="page" to="/technicians/new/">Create Technician</NavLink></li>
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
