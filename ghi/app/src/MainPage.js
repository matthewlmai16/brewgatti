import './index.css';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function MainPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <body>
    <header style={{ paddingLeft: 0}}>

      {/* main page image */}
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "linear-gradient(rgba(122,92,82, 0.2), rgba(122,92,82, 0.2)), url('https://images.unsplash.com/photo-1624471687574-db62e60673f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
          height: 550,
          backgroundPosition: "30% 70%",
          left: 0,
          right: 0,
          backgroundSize: "cover",
        }}
      >
        <div className="px-4 py-5 my-12 text-center">
          <h1 className="display-5 py-5 my-5 fw-bold text-white center">Brewgatti</h1>
        </div>
      </div>

      {/* extra space */}
      <div className='container py-5'>
        <div className='row'></div>
        <h3 className="text-intro text-center pt-5 pb-4">QUALITY AUTOMOBILES FOR ALL</h3>
        <h2 className="text-center center pb-4 text-intro-2">Our mission is to continuously push the boundaries of the automobile industry by bringing innovative and high-quality products to market. Our team of experts works to formulate cutting-edge solutions that meet the needs of drivers and passengers alike.</h2>
      </div>

      {/* grid section */}
      <div className='section'>
      <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card">
            <img src="./bugatti-image-4.png"
              className="card-img-top"
              alt="Hollywood Sign on The Hill"
              style={{
                backgroundPosition: "30% 70%",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">Automobiles</h5>
              <p className="card-text">
                With advancements in technology and design, our automobiles offer a range of features and capabilities that enhance the driving experience and meet the needs of different types of drivers.</p>
              <NavLink to="automobile/list" className="btn btn-main text-white">Go to Automobiles</NavLink>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="./bugatti-image-2.png"
              className="card-img-top"
              alt="Los Angeles Skyscrapers"
            />
            <div className="card-body">
              <h5 className="card-title">Technicians</h5>
              <p className="card-text">Brewgatti technicians offer exceptional services that showcase the company's dedication to providing top-notch customer service and maintaining luxury cars to the highest standard.</p>
              <NavLink to="technicians/list" className="btn btn-main text-white">Meet our Technicians</NavLink>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="./bugatti-image-3.png" className="card-img-top" alt="Skyscrapers"/>
            <div className="card-body">
              <h5 className="card-title">Sales</h5>
              <p className="card-text">
                Examine our sales. Our sales representatives at Brewgatti offer top-notch, round-the-clock vehicle care with exceptional service. Experience the thrill and excitement through our passionate service.</p>
              <NavLink to="salesperson/history" className="btn btn-main text-white active">Our sales reps</NavLink>
            </div>
          </div>
        </div>
      </div>
          </div>

      <div className='container py-5'>
          <div className='row'></div>
      </div>
      </div>

      {/* About Brewgatti */}
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundColor: "#E3DDDD",
          height: 795,
        }}
      >
        <div className="container-fluid px-5 py-3 text-center">
          <h3 className="my-4 text-about center">ABOUT BREWGATTI</h3>
          <div className="col mx-auto">
            <text className="text-about-2 py-3">
              The premiere solution for automobile management provides dealerships with a comprehensive and integrated platform that streamlines all aspects of their operations. The platform is designed to be user-friendly and accessible, so dealerships can manage their operations more efficiently and effectively.
            </text>
          </div>
          <div className="col mx-auto">
            <p className="lead py-4 text-about-3 px-4">
              Fueled by innovation, our expertise in automobiles drives us to explore new technologies, design innovations, and other advancements in the automobile industry.
            </p>
          </div>
          <div className="container mt-3">
            <NavLink to="appointments/new" className="btn btn-main-2 btn-lg text-white">BOOK AN APPOINTMENT</NavLink>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4 py-5">
            <div className="col py-3">
              <img
                src="./telephone.png"
                style={{
                  height: 100,
                  width: 100,
                  position: "center",
                }}
              >
              </img>
              <p className="lead py-4 text-about-3" >On-Call Customer Care </p>
            </div>
            <div className="col py-3">
              <img
                src="./light-bulb.png"
                style={{
                  height: 100,
                  width: 100,
                  position: "center",
                }}
              >
              </img>
              <p className="lead py-4 text-about-3" >Innovative Design </p>
            </div>
            <div className="col py-3">
              <img
                src="./diamond.png"
                style={{
                  height: 100,
                  width: 100,
                  position: "center",
                }}
              >
              </img>
              <p className="lead py-4 text-about-3" >Quality Service </p>
            </div>
            <div className="col py-3">
              <img
                src="./car.png"
                style={{
                  height: 100,
                  width: 100,
                  position: "center",
                }}
              >
              </img>
              <p className="lead py-4 text-about-3" >Automobile Expertise</p>
            </div>
          </div>
        </div>
      </div>


      {/* REVIEWS CAROUSEL */}
      <div
        className="p-5 bg-image"
        style={{
          height: 730,
        }}
      >

        <div className='container'>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <div className="row row-cols-1 row-cols-md-2 g-4 py-5">
                <div className="col text-left">
                  <text className="fw-bold text-intro my-3">WHAT YOU LOVE</text>
                  <p className="font-size-reviews" >I recently had the pleasure of using Brewgatti for my car's service needs and I must say, I was thoroughly impressed with the level of professionalism and expertise they demonstrated. From the moment I walked in, the staff was friendly and accommodating, taking the time to fully understand my car's needs. The service was completed quickly and efficiently, and I was informed of any additional recommendations for future maintenance. I was especially impressed with the attention to detail and the care taken to ensure my car was in top condition. I would highly recommend Brewgatti to anyone looking for a reliable and trustworthy automobile service provider.</p>
                  <p className="font-size-reviews mt-5">Esther K.</p>
                </div>
                <div className="col text-center center px-5">
                  <img
                    src="./reviews-1.png"
                    className="mx-5"
                    style={{
                      height:545,
                      width:410,
                      position: "center",
                    }}
                  >
                  </img>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="row row-cols-1 row-cols-md-2 g-4 py-5">
                <div className="col text-left">
                  <h4 className="fw-bold text-intro my-3">WHAT YOU LOVE</h4>
                  <p className="font-size-reviews" >I have been a loyal customer of Brewgatti for years now and I have to say, they never disappoint. The team at Brewgatti goes above and beyond to provide top-notch service and ensure that my car is running smoothly. The technicians are knowledgeable and always take the time to explain any issues or recommended repairs. I appreciate the transparency and honesty that Brewgatti provides, and I never feel like I am being taken advantage of. I highly recommend this automobile service to anyone looking for exceptional care for their vehicle. Thank you, Brewgatti!</p>
                  <p className="font-size-reviews mt-5">Jason D.</p>
                </div>
                <div className="col text-center px-5">
                  <img
                    src="./reviews-2.png"
                    className="mx-5"
                    style={{
                      height:545,
                      width:410,
                      position: "center",
                    }}
                  >
                  </img>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="row row-cols-1 row-cols-md-2 g-4 py-5">
                <div className="col text-left">
                  <h4 className="fw-bold text-intro my-3">WHAT YOU LOVE</h4>
                  <p className="font-size-reviews" >I recently had the opportunity to purchase a vehicle from Brewgatti and I must say, it was an excellent experience. From the moment I walked in, I was greeted by a friendly and knowledgeable sales team who took the time to understand my needs and find the perfect vehicle for me. The process was smooth and stress-free, and I never felt pressured or rushed. The staff was always available to answer any questions I had and went above and beyond to ensure that I was completely satisfied with my purchase. I love my new vehicle and I am grateful for the outstanding service and support I received from Brewgatti. I highly recommend this dealership to anyone looking for a top-notch buying experience.</p>
                  <p className="font-size-reviews mt-5">Ching C.</p>
                </div>
                <div className="col text-center px-5">
                  <img
                    src="./reviews-3.png"
                    className="mx-5"
                    style={{
                      height:545,
                      width:410,
                      position: "center",
                    }}
                  >
                  </img>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Footer  */}
      <footer className="bg-light text-center text-lg-start">
      <section class="d-flex justify-content-center justify-content-lg-between p-4 bottom-border" style={{backgroundColor: "#E7DDDA"}}>
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="" class="me-4 text-reset">
            <img src="./facebook.png" style={{height:36, width: 36}}></img>
          </a>
          <a href="" class="me-4 text-reset">
            <img src="./instagram.png" style={{height:36, width: 36}}></img>
          </a>
          <a href="" class="me-4 text-reset">
            <img src="./twitter.png" style={{height:36, width: 36}}></img>
          </a>
          <a href="" class="me-4 text-reset">
            <img src="./mail.png" style={{height:36, width: 36}}></img>
          </a>
        </div>
      </section>

      <section className="" style={{backgroundColor: "#E7DDDA"}}>
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 mt-3">
                <img src="./diamond.png" style={{height:25, width:25}}></img> Brewgatti
              </h6>
              <p>
              Brewgatti is a luxury and high-performance car dealership offering a wide range of vehicles and great customer service,
              including financing options and knowledgeable sales staff.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 mt-3">
                Tools & Frameworks
              </h6>
              <p>
                Django
              </p>
              <p>
                Python
              </p>
              <p>
                JavaScript/ES6+
              </p>
              <p>
                PostgreSQL
              </p>
              <p>
                React
              </p>
              <p>
                Bootstrap
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 mt-3">
                Useful links
              </h6>
              <p>
                <a href="#!" className="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Help</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 mt-3">Contact</h6>
              <p><img className="m-1" src="./home.png" style={{height: 25, width:25}}></img>  Los Angeles, CA 91789, US</p>
              <p>
                <img className="m-1" src="./mail.png" style={{height: 25, width:25}}></img>info@example.com
              </p>
              <p><img className="m-1" src="./phone-call.png" style={{height: 25, width:25}}></img> + 01 234 567 88</p>
              <p><img className="m-1" src="./smartphone.png" style={{height: 25, width:25}}></img> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

<div className="text-center p-3" style={{backgroundColor: "#E7DDDA"}}>
  © 2023 Copyright:
  <NavLink className="text-dark" to="">Brewgatti.com</NavLink>
</div>
</footer>
    </header>
    </body>
  )
}

export default MainPage;
