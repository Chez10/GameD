import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Checkout from "./checkout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const itemPrice = cartItems.reduce(
    (acc, product) => acc + product.price * 1,
    0
  );
  const taxPrice = Number((0.05 * itemPrice).toFixed(2));
  const totalPrice = (itemPrice + taxPrice).toFixed(2);
  const processToPayment = () => {
    const data = {
      itemPrice: itemPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("ItemInfo", JSON.stringify(data));
    navigate("/payment");
  };
  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <Checkout confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map((product) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={product.item}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={product.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/item/${product.item}`}>{product.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>${product.price}</p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default OrderConfirm;
