const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// Import Routes
const UserRoute = require("./User/routes/UserRoute.js");
const HakAksesRoute = require("./User/routes/HakAkses/HakAksesRoute.js");
const AktivasiRoute = require("./User/routes/Aktivasi/AktivasiRoute.js");
const DepositRoute = require("./User/routes/Deposit/DepositRoute.js");
const DepositKelasRoute = require("./User/routes/DepositKelas/DepositKelasRoute.js");
const AuthRoute = require("./User/routes/AuthRoute.js");
const JadwalInstrukturRoute = require("./Master/routes/JadwalInstruktur/JadwalInstrukturRoute.js");
const JadwalGymRoute = require("./Master/routes/JadwalGym/JadwalGymRoute.js");
const BookingGymRoute = require("./Master/routes/BookingGym/BookingGymRoute.js");
const BookingKelasRoute = require("./Master/routes/BookingKelas/BookingKelasRoute.js");
const IzinInstrukturRoute = require("./Master/routes/IzinInstruktur/IzinInstrukturRoute.js");
const LaporanKelasRoute = require("./Laporan/routes/LaporanKelas/LaporanKelasRoute.js");
const LaporanGymRoute = require("./Laporan/routes/LaporanGym/LaporanGymRoute.js");
const LaporanInstrukturRoute = require("./Laporan/routes/LaporanInstruktur/LaporanInstrukturRoute.js");
const LaporanPendapatanRoute = require("./Laporan/routes/LaporanPendapatan/LaporanPendapatanRoute.js");

const app = express();
app.use(cors());
app.use(express.json());
// Use Routes
app.use(UserRoute);
app.use("/auth", AuthRoute);
app.use(HakAksesRoute);
app.use(AktivasiRoute);
app.use(DepositRoute);
app.use(DepositKelasRoute);
app.use(JadwalInstrukturRoute);
app.use(JadwalGymRoute);
app.use(BookingGymRoute);
app.use(BookingKelasRoute);
app.use(IzinInstrukturRoute);
app.use(LaporanKelasRoute);
app.use(LaporanGymRoute);
app.use(LaporanInstrukturRoute);
app.use(LaporanPendapatanRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
