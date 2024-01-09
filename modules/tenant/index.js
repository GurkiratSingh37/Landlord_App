"use strict";

const authenticateUser  = require('../../validators/authValidator');
const tenantValidator   = require('./validators/tenantValdiator');
const tenantController  = require('./controller/tenantController');
const userAuth          = authenticateUser.authenticateUser;

router.get("/tenant/get",       tenantValidator.get,      userAuth,   tenantController.get);
router.post("/tenant/create",   tenantValidator.create,   userAuth,   tenantController.create);
router.put("/tenant/update",    tenantValidator.update,   userAuth,   tenantController.update);
router.put("/tenant/remove",    tenantValidator.remove,   userAuth,   tenantController.remove);

router.get("/random/get",       tenantValidator.getRandom,             tenantController.getRandom);
