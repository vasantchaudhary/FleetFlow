// In-memory database
exports.vehicles = [
  { id: 1, model: "Van-01", capacity: 500, status: "Available" },
  { id: 2, model: "Truck-02", capacity: 2000, status: "On Trip" }
];

// GET all vehicles
exports.getVehicles = (req, res) => {
  res.json(vehicles);
};

// POST new vehicle
exports.addVehicle = (req, res) => {
  const newVehicle = req.body;

  vehicles.push(newVehicle);

  res.json({
    message: "Vehicle added successfully",
    vehicle: newVehicle
  });
};

// UPDATE vehicle
exports.updateVehicle = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  Object.assign(vehicle, updatedData);

  res.json({
    message: "Vehicle updated successfully",
    vehicle
  });
};

// DELETE vehicle
exports.deleteVehicle = (req, res) => {
  const id = parseInt(req.params.id);

  const index = vehicles.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  vehicles.splice(index, 1);

  res.json({ message: "Vehicle deleted successfully" });
};