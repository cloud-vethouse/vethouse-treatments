"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerConsultasPorMascota = exports.crearConsulta = void 0;
const Consulta_1 = __importDefault(require("../models/Consulta")); // Si TS te pide extensión, pon Consulta.js
// 1. Guardar una nueva consulta clínica (POST)
const crearConsulta = async (c) => {
    try {
        const body = await c.req.json();
        const nuevaConsulta = new Consulta_1.default(body);
        await nuevaConsulta.save();
        return c.json({
            mensaje: 'Consulta médica registrada con éxito',
            data: nuevaConsulta
        }, 201);
    }
    catch (error) {
        return c.json({ error: 'Error al guardar la consulta', detalle: error.message }, 400);
    }
};
exports.crearConsulta = crearConsulta;
// 2. Obtener todo el historial de una mascota (GET)
const obtenerConsultasPorMascota = async (c) => {
    try {
        const id_mascota = c.req.param('id_mascota');
        const consultas = await Consulta_1.default.find({ id_mascota: Number(id_mascota) }).sort({ fecha_atencion: -1 }); // Ordenado de más reciente a más antiguo
        return c.json(consultas, 200);
    }
    catch (error) {
        return c.json({ error: 'Error al buscar el historial clínico' }, 500);
    }
};
exports.obtenerConsultasPorMascota = obtenerConsultasPorMascota;
