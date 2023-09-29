'use strict';

const express = require('express');
const app     = express();

const router = express.Router();

global.router = router;
global.app = app;

require('./middleware');
require('./modules');
require('./startup').initializeServer();