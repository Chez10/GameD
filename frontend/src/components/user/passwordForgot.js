import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { passwordForgot, clearErrors } from "../../actions/userActions";
const PasswordForgot = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.passwordForgot
  );
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, message]);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(passwordForgot(formData));
  };
  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="edit_profile"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default PasswordForgot;
