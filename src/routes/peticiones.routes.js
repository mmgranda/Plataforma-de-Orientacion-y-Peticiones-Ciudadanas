const express = require("express");
const { prepararDocumentoEditable } = require("../services/documento.service");
const { enviarPeticionAN8n } = require("../services/n8n.services");
const resultadoN8n = {
  modo: "mock",
  estado: "recibida",
  linkDocumento: null
};
const router = express.Router();

function validarPeticion(datos) {
  const campos = [
    "ciudad",
    "fecha",
    "entidad",
    "nombre",
    "tipoDocumento",
    "documento",
    "correo",
    "tipoPeticion",
    "asunto",
    "hechos",
    "solicitud"
  ];

  for (const campo of campos) {
    if (!datos[campo]) {
      return `El campo ${campo} es obligatorio.`;
    }
  }

  return null;
}

router.post("/generar", async (req, res) => {
  try {
    const datos = req.body;
    const error = validarPeticion(datos);
    

    if (error) {
      return res.status(400).json({
        ok: false,
        mensaje: error
      });
    }
    const documentoEditable = await prepararDocumentoEditable(datos);

   
    return res.json({
       ok: true,
       mensaje: "Solicitud recibida correctamente.",
       modo: resultadoN8n.modo || "n8n",
       estado:resultadoN8n.estado || "recibida",
      linkDocumento:resultadoN8n.linkDocumento || documentoEditable.linkGoogleDoc || null,
      documentoEditable
    });
  } catch (error) {
    console.error("Error al generar petición:", error.message);
    console.error(error);

    return res.status(500).json({
      ok: false,
      mensaje: "No fue posible generar la petición en este momento."
    });
  }
});

module.exports = router;
