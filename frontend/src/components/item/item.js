import React from "react";
import { Link } from "react-router-dom";

const item = ({ item }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={item.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/game/${item._id}`}>{item.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ with: `${(item.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({item.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${item.price}</p>
          <Link
            to={`/game/${item._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default item;
