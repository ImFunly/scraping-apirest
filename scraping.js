const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://elpais.com/ultimas-noticias/";

function noticiasMiddleware(req, res, next) {
  axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const noticias = [];

        $("header.c_h").each((index, element) => {
          const titulo = $(element).find("h2").text();
          const enlace = $(element).find("a").attr("href");
          const imagen = $(element).find("img").attr("src");
          const descripcion = $(element).find("p").text();

          noticias.push({ titulo, enlace, imagen, descripcion });
        });
        $("main.mw.mw-mc").each((index, element) => {
          const imagen = $(element).find("img").attr("src");

          noticias.push({ imagen });
        });

        res.json(noticias);
      } else {
        res.status(500).send("Error al obtener los datos");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      res.status(500).send("Error al obtener los datos");
    });
}

module.exports = noticiasMiddleware;
