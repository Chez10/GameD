import React, { Fragment, useState, useEffect } from "react";
import Metadata from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions/itemsActions";
import Item from "./item/item";
import Loader from "./layout/Loader";
import Pagination from "react-js-pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const categories = [
    "Sandbox",
    "Shooters",
    "Multiplayer online battle arena",
    "Role-playing",
    "Sports",
    "Puzzlers",
    "Action-adventure",
    "Horror",
  ];

  const dispatch = useDispatch();

  const { loading, items, gameCount, gamesPerPage } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(getItems(currentPage, category));
  }, [dispatch, currentPage, category]);

  function setPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Get your video games online"} />

          <div className="px-2">
            <div className="mt-5">
              <h4 className="mb-3">Categories</h4>
              <tr className="pl-0">
                {categories.map((category) => (
                  <td
                    style={{
                      cursor: "pointer",
                      listStyleType: "none",
                      padding: 22,
                    }}
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </td>
                ))}
              </tr>
            </div>
          </div>

          <hr className="my-5" />

          <h1
            className="col-sm-12 col-md-6 col-lg-3 my-7"
            id="products_heading"
          >
            All Games
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {items &&
                items.map((item) => (
                  <Item key={item._id} item={item} col={3} />
                ))}
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={gamesPerPage}
              totalItemsCount={gameCount}
              onChange={setPageNo}
              nextPageText={">"}
              prevPageText={"<"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
