// Import vehicles and drivers
const vehicleController = require("./vehicleController");
const driverController = require("./driverController");

// Temporary in-memory trips
let trips = [];

// We need access to vehicle & driver arrays
let vehicles = require("./vehicleController").vehicles;
let drivers = require("./driverController").drivers;

// CREATE TRIP
exports.createTrip = (req, res) => {
  const { id, vehicleId, driverId, cargoWeight, route } = req.body;

  const vehicle = vehicles.find(v => v.id === vehicleId);
  const driver = drivers.find(d => d.id === driverId);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  if (vehicle.status !== "Available") {
    return res.status(400).json({ message: "Vehicle not available" });
  }

  if (driver.status !== "Available") {
    return res.status(400).json({ message: "Driver not available" });
  }

  // Cargo validation
  if (cargoWeight > vehicle.capacity) {
    return res.status(400).json({
      message: "Cargo exceeds vehicle capacity"
    });
  }

  const newTrip = {
    id,
    vehicleId,
    driverId,
    cargoWeight,
    route,
    status: "In Progress"
  };

  trips.push(newTrip);

  // Auto update status
  vehicle.status = "On Trip";
  driver.status = "On Trip";

  res.json({
    message: "Trip created successfully",
    trip: newTrip
  });
};

// GET all trips
exports.getTrips = (req, res) => {
  res.json(trips);
};