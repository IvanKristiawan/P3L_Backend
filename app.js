const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// Import Routes
const UserRoute = require("./User/routes/UserRoute.js");
const AuthRoute = require("./User/routes/AuthRoute.js");
const JadwalInstrukturRoute = require("./Master/routes/JadwalInstruktur/JadwalInstrukturRoute.js");
const JadwalGymRoute = require("./Master/routes/JadwalGym/JadwalGymRoute.js");
const BookingGymRoute = require("./Master/routes/BookingGym/BookingGymRoute.js");
const BookingKelasRoute = require("./Master/routes/BookingKelas/BookingKelasRoute.js");

const app = express();
app.use(cors());
app.use(express.json());
// Use Routes
app.use(UserRoute);
app.use("/auth", AuthRoute);
app.use(JadwalInstrukturRoute);
app.use(JadwalGymRoute);
app.use(BookingGymRoute);
app.use(BookingKelasRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
