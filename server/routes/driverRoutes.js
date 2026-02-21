const express = require("express");
const router = express.Router();

const driverController = require("../controllers/driverController");

router.get("/drivers", driverController.getDrivers);
router.post("/drivers", driverController.addDriver);

module.exports = router;