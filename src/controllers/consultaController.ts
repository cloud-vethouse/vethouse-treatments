import { Context } from 'hono';
import Consulta from '../models/Consulta';

export const crearConsulta = async (c: Context) => {
  try {
    const body = await c.req.json();
    const nuevaConsulta = new Consulta(body);
    await nuevaConsulta.save();
    return c.json({ mensaje: 'Consulta registrada', data: nuevaConsulta }, 201);
  } catch (error: any) {
    return c.json({ error: 'Error al guardar la consulta', detalle: error.message }, 400);
  }
};

export const obtenerConsultas = async (c: Context) => {
  try {
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 10;
    const search = c.req.query('search') || '';
    const skip = (page - 1) * limit;

    const filter = search && !isNaN(Number(search)) ? { id_mascota: Number(search) } : {};

    const [total, consultas] = await Promise.all([
      Consulta.countDocuments(filter),
      Consulta.find(filter).sort({ fecha_atencion: -1 }).skip(skip).limit(limit)
    ]);

    return c.json({
      data: consultas,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }, 200);
  } catch (error: any) {
    return c.json({ error: 'Error al obtener consultas' }, 500);
  }
};

export const obtenerConsultasPorMascota = async (c: Context) => {
  try {
    const id_mascota = c.req.param('id_mascota');
    const consultas = await Consulta.find({ id_mascota: Number(id_mascota) }).sort({ fecha_atencion: -1 }); 
    return c.json(consultas, 200);
  } catch (error: any) {
    return c.json({ error: 'Error al buscar historial' }, 500);
  }
};

// --- LOS MÉTODOS QUE FALTABAN PARA EDITAR Y ELIMINAR ---
export const actualizarConsulta = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const actualizada = await Consulta.findByIdAndUpdate(id, body, { new: true });
    if (!actualizada) return c.json({ error: 'Consulta no encontrada' }, 404);
    return c.json({ data: actualizada }, 200);
  } catch (error: any) {
    return c.json({ error: 'Error al actualizar', detalle: error.message }, 400);
  }
};

export const eliminarConsulta = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const eliminada = await Consulta.findByIdAndDelete(id);
    if (!eliminada) return c.json({ error: 'Consulta no encontrada' }, 404);
    return c.json({ mensaje: 'Consulta eliminada exitosamente' }, 200);
  } catch (error: any) {
    return c.json({ error: 'Error al eliminar', detalle: error.message }, 400);
  }
};