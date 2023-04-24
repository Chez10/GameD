import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ItemInfo from "./components/item/ItemInfo";
import Cart from "./components/cart/Cart";
import Login from "./components/user/login";
import Register from "./components/user/register";
import { load } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/profile";
import ProfileUpdate from "./components/user/profileUpdate";
import PasswordUpdate from "./components/user/passwordUpdate";
import PasswordForgot from "./components/user/passwordForgot";
import PasswordNew from "./components/user/passwordNew";
import OrderConfirm from "./components/cart/orderConfirm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Payment from "./components/cart/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/cart/orderSuccess";
import ListOrders from "./components/order/listOrder";
import OrderDetails from "./components/order/detailOrder";

function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(load());

    // async function getStripeApiKey() {
    //   const { data } = await axios.get("/api/v1/stripeapi");
    //   setStripeApiKey(data.stripeApiKey);
    // }

    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            {/* <Route path="/search/:key" element={<Home />} /> */}
            <Route path="/game/:id" element={<ItemInfo />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<PasswordForgot />} exact />
            <Route
              path="/password/reset/:token"
              element={<PasswordNew />}
              exact
            />
            <Route path="/me" element={<Profile />} exact />
            <Route path="/me/update" element={<ProfileUpdate />} exact />
            <Route path="/password/update" element={<PasswordUpdate />} exact />
            <Route path="/order/confirm" element={<OrderConfirm />} exact />
            <Route path="/success" element={<OrderSuccess />} exact />
            <Route path="/payment" element={<Payment />} />

            <Route path="/orders/me" element={<ListOrders />} exact />
            <Route path="/order/:id" element={<OrderDetails />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
