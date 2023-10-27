'use strict';

require('./health');
require('./register');
require('./login');

app.use(process.env.PATH_ALIAS || '/', router);