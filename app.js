const express = require("express");
const app = express();
const noticias = require("./scraping.js");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", noticias);

app.listen(3000, () => console.log("Express ejecutado en el puerto 3000"));
