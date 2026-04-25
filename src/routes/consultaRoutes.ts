import { Hono } from 'hono';
import { crearConsulta, obtenerConsultasPorMascota } from '../controllers/consultaController';

const router = new Hono();

// Ruta para que el ms2 o el veterinario manden la consulta
router.post('/', crearConsulta);

// Ruta para que el ms4 pida la info
router.get('/mascota/:id_mascota', obtenerConsultasPorMascota);

export default router;