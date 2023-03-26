import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listUserOrders } from '../actions/orderActions';
import Meta from '../components/Meta';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading: loadingOrders, error: errorOrders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (!user.name) {
      dispatch(getUserDetails('profile'));
      dispatch(listUserOrders());
      return;
    }

    setName(user.name);
    setEmail(user.email);
  }, [userInfo, navigate, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    // Dispatch Update Profile
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
    setMessage(null);
  };
  console.log(error);
  return (
    <Row>
      <Meta title="Profile" />
      <Col md={3}>
        <h2>Profile</h2>

        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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
              placeholder="Enter a very strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {loading ? (
            <Loader grow small />
          ) : (
            <Button type="submit" variant="primary" className="mt-3">
              UPDATE PROFILE
            </Button>
          )}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
