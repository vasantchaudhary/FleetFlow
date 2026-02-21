const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const tripRoutes = require("./routes/tripRoutes");

app.use("/", vehicleRoutes);
app.use("/", driverRoutes);
app.use("/", tripRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});