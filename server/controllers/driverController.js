exports.drivers = [
  { id: 1, name: "Alex", licenseValid: true, status: "Available" },
  { id: 2, name: "John", licenseValid: true, status: "Available" }
];

// GET all drivers
exports.getDrivers = (req, res) => {
  res.json(drivers);
};

// ADD driver
exports.addDriver = (req, res) => {
  const newDriver = req.body;
  drivers.push(newDriver);

  res.json({
    message: "Driver added successfully",
    driver: newDriver
  });
};