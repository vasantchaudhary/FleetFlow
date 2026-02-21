const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.get("/vehicles", vehicleController.getVehicles);
router.post("/vehicles", vehicleController.addVehicle);
router.put("/vehicles/:id", vehicleController.updateVehicle);
router.delete("/vehicles/:id", vehicleController.deleteVehicle);

module.exports = router;