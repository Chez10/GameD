import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { removeItemInCart } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const handleRemoveCartItem = (id) => {
    dispatch(removeItemInCart(id));
  };
  const checkoutHandler = () => {
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Your cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((product) => (
                <Fragment>
                  <hr />
                  <div className="cart-item" key={product.item}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={product.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/item/${product.item}`}>{product.name}</Link>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0 ml-5">
                        <p id="card_item_price">${product.price}</p>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleRemoveCartItem(product.item)}
                        ></i>
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
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + 1, 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + 1 * item.price, 0)
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Cart;
