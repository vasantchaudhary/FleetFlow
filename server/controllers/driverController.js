// In-memory database
let drivers = [
  { id: 1, name: "Alex", licenseValid: true, status: "Available" },
  { id: 2, name: "John", licenseValid: true, status: "Available" }
];

// GET all drivers
exports.getDrivers = (req, res) => {
  res.json(drivers);
};

// POST new driver
exports.addDriver = (req, res) => {
  const newDriver = req.body;
  drivers.push(newDriver);

  res.json({
    message: "Driver added successfully",
    driver: newDriver
  });
};

// UPDATE driver
exports.updateDriver = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const driver = drivers.find(d => d.id === id);

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  Object.assign(driver, updatedData);

  res.json({
    message: "Driver updated successfully",
    driver
  });
};

// DELETE driver
exports.deleteDriver = (req, res) => {
  const id = parseInt(req.params.id);

  const index = drivers.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Driver not found" });
  }

  drivers.splice(index, 1);

  res.json({ message: "Driver deleted successfully" });
};