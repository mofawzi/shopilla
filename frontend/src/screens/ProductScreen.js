import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

// Destructuring history and match to access the params object
const ProductScreen = ({ history, match }) => {
  // Quantity in stock (Component level state)
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  // Get product details from store
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  // Handling add to cart button functionality
  const addToCartHandler = () => {
    // Go to cart page with the quantity param
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {
        // Check if loading
        loading ? (
          <Loader />
        ) : // Check if errors
        error ? (
          <Message varient="danger">{error}</Message>
        ) : (
          // Show Products details
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup varient="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {" "}
                          {product.countInStock > 0
                            ? "In Stock "
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Handling quantity in stock of the product*/}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* Make the count of stock as array values */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                // As array starts from 0 --> make it starts from 1
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      }
    </>
  );
};

export default ProductScreen;
