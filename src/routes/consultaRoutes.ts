import { Hono } from 'hono';
import { crearConsulta, obtenerConsultas, obtenerConsultasPorMascota, actualizarConsulta, eliminarConsulta } from '../controllers/consultaController';

const router = new Hono();

router.get('/', obtenerConsultas);
router.post('/', crearConsulta);
router.get('/mascota/:id_mascota', obtenerConsultasPorMascota);

// Rutas vitales para el CRUD
router.put('/:id', actualizarConsulta);
router.delete('/:id', eliminarConsulta);

export default router;