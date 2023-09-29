'use strict';

require('./health');
require('./register');

app.use(process.env.PATH_ALIAS || '/', router);