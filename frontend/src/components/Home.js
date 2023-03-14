import React, { Fragment } from "react";
import Metadata from "./layout/MetaData";

const Home = () => {
  return (
    <Fragment>
      <Metadata title={"Get your video games online"} />
      <h1 className="col-sm-12 col-md-6 col-lg-3 my-7" id="products_heading">
        Latest Games
      </h1>

      <section id="products" className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://image.api.playstation.com/vulcan/ap/rnd/202011/0919/cDHU28ds7cCvKAnVQo719gs0.png"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="">Hogwarts Legacy</a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$59.99</p>
                <a href="#" id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="">Elden Ring</a>
                </h5>
                <div className="ratings mt-auto">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <i className="fa fa-star-o"></i>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$59.99</p>
                <a href="#" id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="">God of War Ragnarök</a>
                </h5>
                <div className="ratings mt-auto">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <i className="fa fa-star-o"></i>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$59.99</p>
                <a href="#" id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://upload.wikimedia.org/wikipedia/en/3/36/Dead_Space_2022_Teaser_Art.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="">Dead Space (2023 remake)</a>
                </h5>
                <div className="ratings mt-auto">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <i className="fa fa-star-o"></i>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$69.99</p>

                <a
                  type="button"
                  href="#"
                  id="view_btn"
                  className="btn btn-block"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="">The Last of Us Part I</a>
                </h5>
                <div className="ratings mt-auto">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <i className="fa fa-star-o"></i>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$69.99</p>
                <a href="#" id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
