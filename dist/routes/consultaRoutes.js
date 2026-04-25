"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const consultaController_1 = require("../controllers/consultaController");
const router = new hono_1.Hono();
// Ruta para que el ms2 o el veterinario manden la consulta
router.post('/', consultaController_1.crearConsulta);
// Ruta para que el ms4 pida la info
router.get('/mascota/:id_mascota', consultaController_1.obtenerConsultasPorMascota);
exports.default = router;
