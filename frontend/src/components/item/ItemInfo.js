import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsInfo, clearErrors } from "../../actions/itemsActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { putItemInCart } from "../../actions/cartActions";

const ItemInfo = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.gameInfo);
  const loading = useSelector((state) => state.Loading);
  const params = useParams();
  const { user } = useSelector((state) => state.auth);

  const addToCart = () => {
    dispatch(putItemInCart(params.id));
  };

  useEffect(() => {
    dispatch(getItemsInfo(params.id));
  }, [dispatch, params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={item.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-7 img-fluid" id="product_image">
              {item.images &&
                item.images.map((image) => (
                  <img
                    className="card-img mx-auto"
                    src={item.images[0].play}
                    width="800"
                    height="600"
                  />
                ))}
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{item.name}</h3>
              <p id="product_id">Product id: {item._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ with: `${(item.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({item.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${item.price}</p>

              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{item.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{item.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ItemInfo;
