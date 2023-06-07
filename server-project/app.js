const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();

/* Cargar rutas */
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const menuRoutes = require("./src/routes/menu");
const categoryRoutes = require("./src/routes/category");
const postRoutes = require("./src/routes/post");

/* Trabajar con la extensión client-rest */
app.use(bodyParser.json());
/* Pruebas de request utilizando postman */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/admin/users`, userRoutes);
app.use(`/api/${API_VERSION}/admin/menu`, menuRoutes);
app.use(`/api/${API_VERSION}/admin/posts`, postRoutes);
app.use(`/api/${API_VERSION}/admin/categories`, categoryRoutes);

module.exports = app;
