import { Context } from 'hono';
import Consulta from '../models/Consulta'; // Si TS te pide extensión, pon Consulta.js

// 1. Guardar una nueva consulta clínica (POST)
export const crearConsulta = async (c: Context) => {
  try {
    const body = await c.req.json();
    const nuevaConsulta = new Consulta(body);
    await nuevaConsulta.save();
    
    return c.json({ 
      mensaje: 'Consulta médica registrada con éxito', 
      data: nuevaConsulta 
    }, 201);
  } catch (error: any) {
    return c.json({ error: 'Error al guardar la consulta', detalle: error.message }, 400);
  }
};

// 2. Obtener todo el historial de una mascota (GET)
export const obtenerConsultasPorMascota = async (c: Context) => {
  try {
    const id_mascota = c.req.param('id_mascota');
    const consultas = await Consulta.find({ id_mascota: Number(id_mascota) }).sort({ fecha_atencion: -1 }); // Ordenado de más reciente a más antiguo
    
    return c.json(consultas, 200);
  } catch (error: any) {
    return c.json({ error: 'Error al buscar el historial clínico' }, 500);
  }
};