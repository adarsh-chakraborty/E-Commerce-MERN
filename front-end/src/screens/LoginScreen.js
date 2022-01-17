import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/userLoginActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') ?? '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch Login

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter E-mail"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {loading ? (
          <Loader grow small />
        ) : (
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        )}
      </Form>
      <Row className="py-3">
        <Col>
          First time shopping at Fmazon?
          <Link
            className="px-2"
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register an account
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
