import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { addToCart } from '../actions/cartActions';

function CartScreen() {
  // Get ProductId
  const { id: productId } = useParams();

  // Navigation Hook
  const navigate = useNavigate();

  // Get Query Param
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qty = Number(queryParams.get('quantity')) || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  console.log(qty);

  return <div>CART</div>;
}

export default CartScreen;
