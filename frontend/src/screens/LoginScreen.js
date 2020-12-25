import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDipatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions ";

const LoginScreen = () => {
  // Set component level state -> initialization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <div></div>;
};

export default LoginScreen;
