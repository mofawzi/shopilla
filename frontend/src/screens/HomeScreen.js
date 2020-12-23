import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Get the data of the store (state)
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  // Firing the action
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {
        // Check if loading
        loading ? (
          <h2>Loading...</h2>
        ) : // Check if errors
        error ? (
          <h3>{error}</h3>
        ) : (
          // Show Products
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )
      }
    </>
  );
};

export default HomeScreen;
