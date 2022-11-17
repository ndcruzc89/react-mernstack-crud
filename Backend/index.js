// Importar modulos
let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

// Ruta de Express
const studentRoute = require("../backend/routes/student.route");

// Cadena de conexión
const db = require("../backend/database/db").mongoURI;

// Conexión con la base de datos mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/students", studentRoute);

// Configuración del puerto (Port)
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});