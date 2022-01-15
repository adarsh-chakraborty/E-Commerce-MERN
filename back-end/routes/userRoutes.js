import express from 'express';

import { authUser } from '../controllers/userController.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.post('/login', catchAsync(authUser));
export default Router;
