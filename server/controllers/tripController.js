// In-memory data (same as other controllers)
let vehicles = [
  { id: 1, model: "Van-01", capacity: 500, status: "Available" },
  { id: 2, model: "Truck-02", capacity: 2000, status: "Available" }
];

let drivers = [
  { id: 1, name: "Alex", licenseValid: true, status: "Available" },
  { id: 2, name: "John", licenseValid: true, status: "Available" }
];

let trips = [];

// CREATE trip
exports.createTrip = (req, res) => {
  const { id, vehicleId, driverId, cargoWeight, route } = req.body;

  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  const driver = drivers.find(d => d.id === driverId);
  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  if (cargoWeight > vehicle.capacity) {
    return res.status(400).json({
      message: "Cargo exceeds vehicle capacity"
    });
  }

  if (!driver.licenseValid) {
    return res.status(400).json({
      message: "Driver license invalid"
    });
  }

  vehicle.status = "On Trip";
  driver.status = "On Trip";

  const newTrip = {
    id,
    vehicleId,
    driverId,
    cargoWeight,
    route,
    status: "In Progress"
  };

  trips.push(newTrip);

  res.json({
    message: "Trip created successfully",
    trip: newTrip
  });
};

// GET all trips
exports.getTrips = (req, res) => {
  res.json(trips);
};