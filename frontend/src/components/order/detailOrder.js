import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  myOrders,
  clearErrors,
} from "../../actions/orderActions";
import Loader from "../layout/Loader";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector((state) => state.detailOrder);
  const { orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
  useEffect(() => {
    dispatch(getOrderDetails(params.id));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, params.id]);
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  return (
    <Fragment>
      <MetaData title={"Order Details"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Delievered")
                    ? "PAID"
                    : "NOT PAID"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => {
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>1 Piece</p>
                      </div>
                    </div>;
                  })}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default OrderDetails;
