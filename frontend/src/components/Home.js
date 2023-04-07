import React, { Fragment, useEffect } from "react";
import Metadata from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions/itemsActions";
import Item from "./item/item";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, items, gameCount } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Get your video games online"} />
          <h1
            className="col-sm-12 col-md-6 col-lg-3 my-7"
            id="products_heading"
          >
            Latest Games
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {items &&
                items.map((item) => <Item key={item._id} item={item} />)}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
